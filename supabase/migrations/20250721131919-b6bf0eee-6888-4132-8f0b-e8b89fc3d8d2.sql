-- Create custom types
CREATE TYPE public.user_role AS ENUM ('student', 'landlord', 'admin');
CREATE TYPE public.hostel_status AS ENUM ('available', 'occupied', 'maintenance');
CREATE TYPE public.booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  role user_role NOT NULL DEFAULT 'student',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create locations table for Chuka University area
CREATE TABLE public.locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  distance_to_university INTEGER, -- distance in meters
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create hostels table
CREATE TABLE public.hostels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  landlord_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  location_id UUID REFERENCES public.locations(id),
  name TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  rent_amount DECIMAL(10,2) NOT NULL,
  rooms_available INTEGER NOT NULL DEFAULT 1,
  total_rooms INTEGER NOT NULL,
  amenities TEXT[],
  images TEXT[],
  status hostel_status NOT NULL DEFAULT 'available',
  contact_phone TEXT,
  contact_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hostel_id UUID NOT NULL REFERENCES public.hostels(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  status booking_status NOT NULL DEFAULT 'pending',
  check_in_date DATE,
  check_out_date DATE,
  total_amount DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat_rooms table for conversations
CREATE TABLE public.chat_rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  landlord_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  hostel_id UUID REFERENCES public.hostels(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(student_id, landlord_id, hostel_id)
);

-- Create messages table for chat functionality
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hostels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for hostels
CREATE POLICY "Anyone can view available hostels" ON public.hostels FOR SELECT USING (true);
CREATE POLICY "Landlords can manage their hostels" ON public.hostels FOR ALL USING (auth.uid() = landlord_id);
CREATE POLICY "Landlords can insert hostels" ON public.hostels FOR INSERT WITH CHECK (auth.uid() = landlord_id);

-- RLS Policies for bookings
CREATE POLICY "Users can view their own bookings" ON public.bookings 
  FOR SELECT USING (
    auth.uid() = student_id OR 
    auth.uid() IN (SELECT landlord_id FROM public.hostels WHERE id = hostel_id)
  );
CREATE POLICY "Students can create bookings" ON public.bookings 
  FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Students and landlords can update relevant bookings" ON public.bookings 
  FOR UPDATE USING (
    auth.uid() = student_id OR 
    auth.uid() IN (SELECT landlord_id FROM public.hostels WHERE id = hostel_id)
  );

-- RLS Policies for chat_rooms
CREATE POLICY "Users can view their chat rooms" ON public.chat_rooms 
  FOR SELECT USING (auth.uid() = student_id OR auth.uid() = landlord_id);
CREATE POLICY "Users can create chat rooms" ON public.chat_rooms 
  FOR INSERT WITH CHECK (auth.uid() = student_id OR auth.uid() = landlord_id);

-- RLS Policies for messages
CREATE POLICY "Users can view messages in their rooms" ON public.messages 
  FOR SELECT USING (
    room_id IN (
      SELECT id FROM public.chat_rooms 
      WHERE student_id = auth.uid() OR landlord_id = auth.uid()
    )
  );
CREATE POLICY "Users can send messages in their rooms" ON public.messages 
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    room_id IN (
      SELECT id FROM public.chat_rooms 
      WHERE student_id = auth.uid() OR landlord_id = auth.uid()
    )
  );

-- RLS Policies for locations (public read-only)
CREATE POLICY "Anyone can view locations" ON public.locations FOR SELECT USING (true);

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student')
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_hostels_updated_at
  BEFORE UPDATE ON public.hostels
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample Chuka University locations
INSERT INTO public.locations (name, description, distance_to_university) VALUES
('Chuka University Main Campus', 'Main university campus', 0),
('Chuka Town Center', 'Central business district', 2000),
('Kangaru Market', 'Local market area', 1500),
('Chuka Stadium', 'Sports complex area', 1200),
('Hospital Road', 'Near Chuka Hospital', 800),
('Matinyani', 'Residential area', 3000);

-- Enable realtime for chat functionality
ALTER TABLE public.messages REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER TABLE public.chat_rooms REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_rooms;
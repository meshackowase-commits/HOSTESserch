import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Check, X, Calendar, Users, Phone, Mail, Wifi, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HostelDetail = () => {
  const { id } = useParams();
  const [selectedRoom, setSelectedRoom] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  
  // Mock data - in real app this would come from API
  const hostel = {
    id: parseInt(id || "1"),
    name: "Chuka View Hostel",
    price: "KSh 8,000",
    period: "per semester",
    distance: "0.5km from campus",
    rating: 4.5,
    reviews: 23,
    gender: "Mixed",
    description: "Modern hostel with excellent facilities and a welcoming environment for students. Located just minutes from Chuka University campus with 24/7 security.",
    images: [
      "/placeholder.svg",
      "/placeholder.svg", 
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    amenities: [
      { name: "Wi-Fi", available: true, icon: Wifi },
      { name: "CCTV Security", available: true, icon: Shield },
      { name: "24/7 Water Supply", available: true, icon: "💧" },
      { name: "Electricity Backup", available: true, icon: Zap },
      { name: "Common Kitchen", available: true, icon: "🍳" },
      { name: "Study Room", available: true, icon: "📚" },
      { name: "Laundry Service", available: false, icon: "🧺" },
      { name: "Parking Space", available: true, icon: "🚗" }
    ],
    roomTypes: [
      { type: "Single Room", price: "KSh 8,000", available: 5 },
      { type: "Double Room", price: "KSh 6,000", available: 3 },
      { type: "Shared Room (4 people)", price: "KSh 4,500", available: 2 }
    ],
    location: {
      address: "123 University Road, Chuka",
      coordinates: "0.3365° S, 37.6490° E"
    },
    contact: {
      phone: "+254 712 345 678",
      email: "bookings@chukaview.com",
      whatsapp: "+254 712 345 678"
    }
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission
    console.log("Booking submitted");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link to="/hostels">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Hostels
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
              <img
                src={hostel.images[0]}
                alt={hostel.name}
                className="col-span-2 md:col-span-1 md:row-span-2 w-full h-64 md:h-full object-cover"
              />
              {hostel.images.slice(1, 4).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${hostel.name} ${index + 2}`}
                  className="w-full h-32 object-cover"
                />
              ))}
            </div>

            {/* Hostel Info */}
            <div>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{hostel.name}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {hostel.distance}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {hostel.rating} ({hostel.reviews} reviews)
                    </div>
                  </div>
                  <Badge variant="secondary">{hostel.gender}</Badge>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">{hostel.price}</p>
                  <p className="text-muted-foreground">{hostel.period}</p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">{hostel.description}</p>
            </div>

            {/* Room Types */}
            <Card>
              <CardHeader>
                <CardTitle>Available Room Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hostel.roomTypes.map((room, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{room.type}</h4>
                        <p className="text-sm text-muted-foreground">{room.available} rooms available</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{room.price}</p>
                        <p className="text-sm text-muted-foreground">per semester</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hostel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {amenity.available ? (
                        <Check className="w-5 h-5 text-success" />
                      ) : (
                        <X className="w-5 h-5 text-destructive" />
                      )}
                      <span className={`text-sm ${!amenity.available ? 'text-muted-foreground line-through' : ''}`}>
                        {amenity.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">{hostel.location.address}</p>
                    <p className="text-sm text-muted-foreground">{hostel.location.coordinates}</p>
                  </div>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Map will be embedded here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Book Your Room</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <Label htmlFor="room-type">Room Type</Label>
                    <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        {hostel.roomTypes.map((room, index) => (
                          <SelectItem key={index} value={room.type}>
                            {room.type} - {room.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="checkin">Preferred Check-in Date</Label>
                    <Input
                      type="date"
                      id="checkin"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+254 712 345 678" />
                  </div>

                  <div>
                    <Label htmlFor="student-id">Student/Admission Number</Label>
                    <Input id="student-id" placeholder="Enter your student ID" />
                  </div>

                  <div>
                    <Label htmlFor="notes">Special Requests (Optional)</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Any special requirements or requests..."
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full" variant="cta" size="lg">
                    Book Now
                  </Button>

                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">Need help? Contact us:</p>
                    <div className="flex flex-col gap-1 text-sm">
                      <a href={`tel:${hostel.contact.phone}`} className="flex items-center gap-2 text-primary hover:underline">
                        <Phone className="w-4 h-4" />
                        {hostel.contact.phone}
                      </a>
                      <a href={`mailto:${hostel.contact.email}`} className="flex items-center gap-2 text-primary hover:underline">
                        <Mail className="w-4 h-4" />
                        {hostel.contact.email}
                      </a>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelDetail;
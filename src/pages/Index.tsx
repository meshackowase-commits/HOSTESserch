import { useState } from "react";
import { Search, MapPin, Star, Wifi, Shield, Zap, Calendar, Users, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-hostel.jpg";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const featuredHostels = [
    {
      id: 1,
      name: "Chuka View Hostel",
      price: "KSh 8,000",
      rating: 4.5,
      distance: "0.5km from campus",
      image: "/placeholder.svg",
      gender: "Mixed",
      amenities: ["Wi-Fi", "CCTV", "Water"]
    },
    {
      id: 2,
      name: "Student Paradise",
      price: "KSh 6,500",
      rating: 4.2,
      distance: "1.2km from campus",
      image: "/placeholder.svg",
      gender: "Ladies Only",
      amenities: ["Wi-Fi", "Water", "Kitchen"]
    },
    {
      id: 3,
      name: "Campus Lodge",
      price: "KSh 9,500",
      rating: 4.7,
      distance: "0.3km from campus",
      image: "/placeholder.svg",
      gender: "Gents Only",
      amenities: ["Wi-Fi", "CCTV", "Water", "Kitchen"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
              <span className="text-xl font-bold text-primary">ChukaHostels</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/hostels" className="text-foreground hover:text-primary transition-colors">Browse Hostels</Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost">Sign In</Button>
              <Button variant="cta">Sign Up</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Chuka University Hostels"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Find the Perfect Hostel Near Chuka University
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
              Book Early for the September Intake! Discover comfortable, affordable, and safe accommodation options.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-xl p-2 shadow-elegant animate-scale-in">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search by hostel name, location, or price..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 border-0 focus-visible:ring-0 text-foreground"
                  />
                </div>
                <Link to="/hostels">
                  <Button variant="cta" size="lg" className="w-full md:w-auto">
                    Search Hostels
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <Link to="/hostels">
                <Button variant="hero" size="lg">
                  Browse All Hostels
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Verified Hostels</p>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-primary mb-2">1,200+</div>
              <p className="text-muted-foreground">Happy Students</p>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hostels */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Hostels</h2>
            <p className="text-xl text-muted-foreground">Handpicked accommodations perfect for Chuka University students</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHostels.map((hostel) => (
              <Card key={hostel.id} className="overflow-hidden hover:shadow-card transition-all duration-300 hover:scale-105 animate-fade-in">
                <div className="relative">
                  <img
                    src={hostel.image}
                    alt={hostel.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-success text-success-foreground">
                      ★ {hostel.rating}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="bg-white/90 text-foreground">
                      {hostel.gender}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{hostel.name}</CardTitle>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {hostel.distance}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{hostel.price}</p>
                      <p className="text-sm text-muted-foreground">per semester</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {hostel.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <Link to={`/hostel/${hostel.id}`}>
                    <Button className="w-full" variant="cta">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/hostels">
              <Button variant="outline" size="lg">
                View All Hostels
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Students Choose Us</h2>
            <p className="text-xl text-muted-foreground">Your safety, comfort, and convenience are our priorities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Verified Hostels</h3>
              <p className="text-sm text-muted-foreground">All hostels are personally verified for safety and quality</p>
            </div>

            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Easy Booking</h3>
              <p className="text-sm text-muted-foreground">Simple online booking process with instant confirmation</p>
            </div>

            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Round-the-clock support via WhatsApp and phone</p>
            </div>

            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Student Community</h3>
              <p className="text-sm text-muted-foreground">Connect with fellow Chuka University students</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Secure Your Room?</h2>
          <p className="text-xl mb-8 opacity-90">Don't wait - the best hostels fill up fast for the September intake!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/hostels">
              <Button variant="hero" size="xl">
                Start Browsing Now
              </Button>
            </Link>
            <Button variant="outline" size="xl" className="text-white border-white hover:bg-white hover:text-primary">
              Get Help Choosing
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg"></div>
                <span className="text-xl font-bold">ChukaHostels</span>
              </div>
              <p className="text-sm opacity-75">Your trusted partner for student accommodation near Chuka University.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link to="/hostels" className="block opacity-75 hover:opacity-100">Browse Hostels</Link>
                <Link to="/about" className="block opacity-75 hover:opacity-100">About Us</Link>
                <Link to="/contact" className="block opacity-75 hover:opacity-100">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <div className="space-y-2 text-sm">
                <p className="opacity-75">WhatsApp: +254 115 722 560</p>
                <p className="opacity-75">Email: support@chukahostels.com</p>
                <p className="opacity-75">24/7 Student Support</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Follow Us</h4>
              <div className="space-y-2 text-sm">
                <p className="opacity-75">Facebook</p>
                <p className="opacity-75">Instagram</p>
                <p className="opacity-75">Twitter</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-75">
            <p>&copy; 2024 ChukaHostels. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

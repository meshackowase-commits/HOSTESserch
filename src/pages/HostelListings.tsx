import { useState } from "react";
import React from "react";
import { Search, Filter, MapPin, Wifi, Camera, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const HostelListings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const hostels = [
    {
      id: 1,
      name: "Chuka View Hostel",
      price: "KSh 8,000",
      period: "per semester",
      distance: "0.5km from campus",
      image: "/placeholder.svg",
      rating: 4.5,
      roomType: "Single/Double",
      gender: "Mixed",
      amenities: ["Wi-Fi", "CCTV", "Water", "Electricity"],
      description: "Modern hostel with excellent facilities"
    },
    {
      id: 2,
      name: "Student Paradise",
      price: "KSh 6,500",
      period: "per semester",
      distance: "1.2km from campus",
      image: "/placeholder.svg",
      rating: 4.2,
      roomType: "Shared",
      gender: "Ladies Only",
      amenities: ["Wi-Fi", "Water", "Kitchen"],
      description: "Safe and comfortable accommodation for ladies"
    },
    {
      id: 3,
      name: "Campus Lodge",
      price: "KSh 9,500",
      period: "per semester",
      distance: "0.3km from campus",
      image: "/placeholder.svg",
      rating: 4.7,
      roomType: "Single",
      gender: "Gents Only",
      amenities: ["Wi-Fi", "CCTV", "Water", "Electricity", "Kitchen"],
      description: "Premium accommodation very close to campus"
    }
  ];

  const amenityIcons = {
    "Wi-Fi": Wifi,
    "CCTV": Shield,
    "Water": "💧",
    "Electricity": Zap,
    "Kitchen": "🍳"
  };

  const filterOptions = [
    { label: "Under KSh 7,000", value: "under-7000" },
    { label: "KSh 7,000 - 9,000", value: "7000-9000" },
    { label: "Above KSh 9,000", value: "above-9000" },
    { label: "Bedsitter", value: "bedsitter" },
    { label: "Single Room", value: "single" },
    { label: "One Bedroom", value: "one-bedroom" },
    { label: "Two Bedrooms", value: "two-bedroom" },
    { label: "Three Bedrooms", value: "three-bedroom" },
    { label: "Wi-Fi", value: "wifi" },
    { label: "CCTV", value: "cctv" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Hostel</h1>
          <p className="text-lg opacity-90">Discover comfortable and affordable accommodation near Chuka University</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search hostels by name, location, or amenities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            {filterOptions.map((filter) => (
              <Button
                key={filter.value}
                variant={selectedFilters.includes(filter.value) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  if (selectedFilters.includes(filter.value)) {
                    setSelectedFilters(prev => prev.filter(f => f !== filter.value));
                  } else {
                    setSelectedFilters(prev => [...prev, filter.value]);
                  }
                }}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">Showing {hostels.length} hostels available for September intake</p>
        </div>

        {/* Hostel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostels.map((hostel) => (
            <Card key={hostel.id} className="overflow-hidden hover:shadow-card transition-all duration-300 hover:scale-105">
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
                    <h3 className="font-semibold text-lg">{hostel.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {hostel.distance}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary text-lg">{hostel.price}</p>
                    <p className="text-sm text-muted-foreground">{hostel.period}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3">{hostel.description}</p>
                <p className="text-sm font-medium mb-2">Room Type: {hostel.roomType}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {hostel.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {typeof amenityIcons[amenity] === 'string' 
                        ? amenityIcons[amenity] 
                        : amenityIcons[amenity] && React.createElement(amenityIcons[amenity], { className: "w-3 h-3 mr-1" })
                      }
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

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Hostels
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HostelListings;
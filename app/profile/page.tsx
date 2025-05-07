"use client";

import { useUser } from "@/contexts/user-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BlockiesAvatar } from "../../components/ui/blockies-avatar";
import { Package, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      if (!isLoading && !user) {
        router.push("/login");
        return;
      }
    }, 1000);

    return () => clearTimeout(redirectTimer);
  }, [user, router, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#f77a0e] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return null;
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                <BlockiesAvatar
                  seed={user.email}
                  scale={10}
                  className="h-32 w-32"
                />
                <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-[#f77a0e] text-white px-3 py-1 rounded-full text-sm font-medium">
                Member
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
              <p className="text-gray-500 mb-4">{user.email}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-gray-50 rounded-xl px-4 py-2">
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="text-xl font-bold text-gray-900">{user.orders.length}</p>
                </div>
                <div className="bg-gray-50 rounded-xl px-4 py-2">
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-xl font-bold text-gray-900">
                    {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="bg-white p-1 rounded-xl shadow-sm border border-gray-100">
            <TabsTrigger 
              value="orders"
              className="data-[state=active]:bg-[#f77a0e] data-[state=active]:text-white rounded-lg px-6 py-2.5"
            >
              <Package className="w-5 h-5 mr-2" />
              Orders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            {user.orders.length === 0 ? (
              <Card className="bg-white border-gray-100 shadow-lg">
                <CardContent className="py-12">
                  <div className="flex flex-col items-center gap-4">
                    <Package className="w-12 h-12 text-gray-400" />
                    <p className="text-gray-500 text-lg">No orders yet</p>
                    <button 
                      onClick={() => router.push('/')}
                      className="mt-4 px-6 py-2 bg-[#f77a0e] text-white rounded-xl hover:bg-[#f77a0e]/90 transition-colors duration-200"
                    >
                      Start Shopping
                    </button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              user.orders.map((order) => (
                <Card key={order.id} className="bg-white border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <CardHeader className="border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-bold text-gray-900">
                        Order #{order.id}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className="text-sm font-medium text-gray-600">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Product</p>
                          <p className="font-medium text-gray-900">{order.productName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Item</p>
                          <p className="font-medium text-gray-900">{order.itemName}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="font-medium text-gray-900">
                            {new Date(order.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Amount</p>
                          <p className="text-xl font-bold text-[#f77a0e]">
                            Rp {order.total.toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

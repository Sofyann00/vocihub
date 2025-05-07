"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { products } from "@/lib/data"
import { notFound } from "next/navigation"
import { cn } from "@/lib/utils"
import { useUser } from "@/contexts/user-context"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export default function ProductPage({ params }: { params: { id: string } }) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const { user, addOrder } = useUser()
  const [selectedItem, setSelectedItem] = useState<any | null>(null)
  const [playerId, setPlayerId] = useState("")
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)

  const product = products.find(p => p.id === parseInt(params.id))

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    if (!selectedItem || !playerId || !selectedPayment) {
      toast({
        title: "Missing information",
        description: "Please select a package, enter your Player ID, and choose a payment method.",
        variant: "destructive"
      })
      return
    }

    setShowPaymentDialog(true)
  }

  const handlePaymentComplete = async () => {
    if (!user?.email) {
      toast({
        title: "Error",
        description: "Please log in to complete your purchase.",
        variant: "destructive"
      })
      return
    }

    setIsSendingEmail(true)
    
    try {
      // Add to cart
      addItem({
        ...product,
        price: selectedItem.price,
        quantity: 1,
        playerId
      })

      // Add order to user's orders
      addOrder({
        items: [{
          id: selectedItem.id.toString(),
          name: selectedItem.name,
          price: selectedItem.price,
          quantity: 1,
          image: selectedItem.iconUrl || product.image
        }],
        total: selectedItem.price,
        status: "completed",
        productName: product.name,
        itemName: selectedItem.name
      })

      // Send confirmation email via API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: user.email,
          productName: product.name,
          itemName: selectedItem.name,
          price: selectedItem.price,
          playerId: playerId
        }),
      });

      const data = await response.json();

      if (!data.success) {
        toast({
          title: "Email Error",
          description: "Failed to send confirmation email, but your purchase was successful.",
          variant: "destructive"
        })
      }
      
      setShowPaymentDialog(false)
      toast({
        title: "Thank You For Purchasing",
        description: `Your purchase of ${selectedItem.name} for ${product.name} is being processed. We'll notify you via email once completed.`,
      })
    } catch (error) {
    toast({
        title: "Error",
        description: "An error occurred while processing your purchase. Please try again.",
        variant: "destructive"
    })
    } finally {
      setIsSendingEmail(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Game Header with Banner */}
      <div className="relative h-[400px] overflow-hidden">
        {/* Banner Image with Parallax Effect */}
        <div className="absolute inset-0">
          <Image
            src={product.banner}
            alt={product.name}
            fill
            className="object-cover transform scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

        {/* Content Overlay */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Game Logo */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Game Info */}
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">{product.name}</h1>
                <p className="text-gray-300 text-lg mb-6">{product.category}</p>
                
                {/* Badges */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <div className="bg-[#f77a0e] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    Customer Service 24/7
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#f77a0e] rounded-full"></span>
                    Instant Delivery
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#f77a0e]">
                  <path d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pilih Nominal Top Up
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {product.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={cn(
                      "group relative overflow-hidden rounded-xl border p-4 transition-all duration-300",
                      selectedItem?.id === item.id
                        ? "border-[#f77a0e] bg-[#f77a0e]/5"
                        : "border-gray-200 hover:border-[#f77a0e]/50 hover:bg-[#f77a0e]/5"
                    )}
                  >
                    {item.iconUrl && (
                      <div className="mb-3">
                        <Image
                          src={item.iconUrl}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="text-left">
                      <p className="font-semibold text-gray-900 group-hover:text-[#f77a0e] transition-colors duration-200">{item.name}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Rp {item.price.toLocaleString('id-ID')},-
                      </p>
                    </div>
                    {selectedItem?.id === item.id && (
                      <div className="absolute top-2 right-2">
                        <div className="w-5 h-5 rounded-full bg-[#f77a0e] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Order Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#f77a0e]">
                  <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                </svg>
                Informasi Pesanan
              </h2>

              <div className="space-y-6">
                {/* Player ID Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Masukkan Player ID
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your Player ID"
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#f77a0e] focus:ring-2 focus:ring-[#f77a0e]/20 transition-all duration-200"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Simpan ID dengan fitur Save ID
                  </p>
                </div>

                {/* Payment Methods */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Pilih Pembayaran</h3>
                  
                  {/* QRIS */}
                  <button
                    onClick={() => setSelectedPayment('qris')}
                    className={cn(
                      "w-full p-4 rounded-xl border mb-3 flex items-center justify-between transition-all duration-200",
                      selectedPayment === 'qris'
                        ? "border-[#f77a0e] bg-[#f77a0e]/5"
                        : "border-gray-200 hover:border-[#f77a0e]/50 hover:bg-[#f77a0e]/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src="/qris_img.png"
                        alt="QRIS"
                        width={60}
                        height={24}
                        className="object-contain"
                      />
                      <span className="text-gray-900">QRIS</span>
                    </div>
                    <span className="text-gray-500">
                      Rp {selectedItem?.price.toLocaleString('id-ID') ?? '0'},-
                    </span>
                  </button>

                  {/* Virtual Account */}
                  <button
                    onClick={() => setSelectedPayment('va')}
                    className={cn(
                      "w-full p-4 rounded-xl border flex items-center justify-between transition-all duration-200",
                      selectedPayment === 'va'
                        ? "border-[#f77a0e] bg-[#f77a0e]/5"
                        : "border-gray-200 hover:border-[#f77a0e]/50 hover:bg-[#f77a0e]/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-900">Virtual Account</span>
                    </div>
                    <span className="text-gray-500">
                      Rp {selectedItem?.price.toLocaleString('id-ID') ?? '0'},-
                    </span>
                  </button>
                </div>

                {/* Payment Instructions */}
                {selectedPayment && (
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Cara Pembayaran:</h4>
                    {selectedPayment === 'qris' ? (
                      <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                        <li>Scan QR Code yang muncul setelah konfirmasi</li>
                        <li>Pilih aplikasi e-wallet atau mobile banking</li>
                        <li>Masukkan nominal pembayaran</li>
                        <li>Konfirmasi pembayaran</li>
                      </ol>
                    ) : (
                      <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                        <li>Nomor Virtual Account akan muncul setelah konfirmasi</li>
                        <li>Buka aplikasi mobile banking</li>
                        <li>Pilih menu Transfer ke Virtual Account</li>
                        <li>Masukkan nomor Virtual Account</li>
                        <li>Konfirmasi pembayaran</li>
                      </ol>
                    )}
                  </div>
                )}

                <Button 
                  size="lg" 
                  className="w-full bg-[#f77a0e] hover:bg-[#f77a0e]/90 text-white rounded-xl shadow-lg shadow-[#f77a0e]/20 hover:shadow-xl hover:shadow-[#f77a0e]/30 transition-all duration-300"
                  onClick={handleAddToCart}
                >
                  Konfirmasi Top Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Payment Details</DialogTitle>
            <DialogDescription className="text-gray-500">
              Complete your payment using the selected method
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-gray-900">
                Rp {selectedItem?.price.toLocaleString('id-ID')},-
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {selectedItem?.name} for {product.name}
              </p>
            </div>

            {selectedPayment === 'qris' ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-64 h-64 p-4 bg-white rounded-xl shadow-lg">
                  <Image
                    src="/payout_qris.png"
                    alt="QRIS QR Code"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Scan QR code using your preferred payment app
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Virtual Account Number:</p>
                  <p className="text-xl font-mono font-semibold text-gray-900">8800123456789</p>
                </div>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>1. Login to your mobile banking app</li>
                  <li>2. Select Virtual Account payment</li>
                  <li>3. Enter the VA number above</li>
                  <li>4. Confirm and complete your payment</li>
                </ul>
              </div>
            )}

            <div className="flex justify-center gap-3 mt-6">
              <Button
                onClick={handlePaymentComplete}
                disabled={isSendingEmail}
                className="bg-[#f77a0e] hover:bg-[#f77a0e]/90 text-white rounded-xl shadow-lg shadow-[#f77a0e]/20 hover:shadow-xl hover:shadow-[#f77a0e]/30 transition-all duration-300"
              >
                {isSendingEmail ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "I have completed the payment"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 
"use client"

import { useState } from "react"
import { useUser } from "@/contexts/user-context"
import { User, LogOut, Search, Menu, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { products } from "@/lib/data"

export function Navbar() {
  const { user, logout } = useUser()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    setShowSearchResults(query.length > 0)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img 
              src="/app_icon.png" 
              alt="vocihub Logo"
              width={200}
              height={200}
              className="object-contain"
            />
          </Link>

          {/* Search and Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-64 px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#f77a0e] focus:ring-2 focus:ring-[#f77a0e]/20 transition-all duration-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 max-h-96 overflow-y-auto z-50">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <Link 
                        key={product.id} 
                        href={`/products/${product.id}`}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          setSearchQuery("")
                          setShowSearchResults(false)
                        }}
                      >
                        <div className="relative w-10 h-10 flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {product.category}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-3 text-sm text-gray-500 text-center">
                      No products found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-xl transition-colors">
                      <div className="w-8 h-8 rounded-full bg-[#f77a0e]/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-[#f77a0e]" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{user.name}</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        logout()
                        router.push("/")
                      }}
                      className="cursor-pointer text-red-600"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link 
                    href="/login"
                    className="hidden md:flex px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#f77a0e] transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="hidden md:flex px-4 py-2 text-sm font-medium text-white bg-[#f77a0e] rounded-xl hover:bg-[#f77a0e]/90 transition-colors"
                  >
                    Daftar
                  </Link>
                </>
              )}

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 hover:bg-gray-50 rounded-xl transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#f77a0e] focus:ring-2 focus:ring-[#f77a0e]/20 transition-all duration-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              
              {/* Mobile Search Results */}
              {showSearchResults && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 max-h-96 overflow-y-auto z-50">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <Link 
                        key={product.id} 
                        href={`/products/${product.id}`}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          setSearchQuery("")
                          setShowSearchResults(false)
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        <div className="relative w-10 h-10 flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {product.category}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-3 text-sm text-gray-500 text-center">
                      No products found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      router.push("/")
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-gray-50 rounded-xl flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-4 py-2 text-sm font-medium text-white bg-[#f77a0e] rounded-xl hover:bg-[#f77a0e]/90"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
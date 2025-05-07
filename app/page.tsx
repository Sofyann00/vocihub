"use client"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Button } from "@/components/ui/button"
import { ChevronRight, Gamepad2, Gift, CreditCard, ArrowRight, Smartphone, Monitor, Globe, Users, LucideProps, CheckCircle2, Zap, Shield, Sparkles, Search, ShoppingCart, User, LogOut } from "lucide-react"
import Link from "next/link"
import { products } from "@/lib/data"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { formatPrice } from "@/lib/data"
import { useRef, useState } from "react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useUser } from "@/contexts/user-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export default function Home() {
  const { user, logout } = useUser()
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [openQna, setOpenQna] = useState<number | null>(null);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    setShowSearchResults(query.length > 0)
  }

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 3,
      spacing: 30,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(max-width: 480px)": {
        slides: { perView: 1, spacing: 10 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  const servicesRef = useRef<HTMLDivElement>(null)
  
  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const categories = [
    { name: "PC Gaming", icon: (props: LucideProps) => <Monitor {...props} /> },
    { name: "Console Gaming", icon: (props: LucideProps) => <Gamepad2 {...props} /> },
    { name: "Mobile Gaming", icon: (props: LucideProps) => <Smartphone {...props} /> },
    { name: "Online Gaming", icon: (props: LucideProps) => <Globe {...props} /> },
  ]

  const heroSlides = [
    {
      key: "slide1",
      bg: "/banner_01.jpg",
      title: "Mobile Legends: Bang Bang",
      subtitle: "Get your Starlight, Diamonds, and more!",
    },
    {
      key: "slide2",
      bg: "/banner_02.jpg",
      title: "Free Fire",
      subtitle: "Top up your Diamonds and enjoy the battle!",
    },
    {
      key: "slide3",
      bg: "/banner_03.jpg",
      title: "PUBG Mobile",
      subtitle: "Get your UC and dominate the battleground!",
    },
    {
      key: "slide4",
      bg: "/banner_04.webp",
      title: "Honor of Kings",
      subtitle: "Ultimate 5v5 Hero Battle Game",
    },
    {
      key: "slide5",
      bg: "/banner_05.jpg",
      title: "Ragnarok Guild Championship",
      subtitle: "Join the adventure and win rewards!",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    centerMode: true,
    centerPadding: "0",
    swipeToSlide: true,
    swipe: true,
    touchMove: true,
    customPaging: () => (
      <div className="my-4 h-2 transition-all duration-300">
        <div
          className="!mx-[4px] h-2 w-2 rounded-full bg-white/30 \
          hover:bg-white/50 [.slick-active_&]:w-8 [.slick-active_&]:bg-white"
        />
      </div>
    ),
    dotsClass: "slick-dots flex justify-center w-full",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0",
          centerMode: false,
        },
      },
    ],
  };

  const marketplaceFeatures = [
    {
      name: 'Top Up Game Credits',
      description: 'Instantly top up your favorite games with a variety of payment methods.',
      icon: <Gamepad2 className="h-8 w-8 text-blue-400" />,
    },
    {
      name: 'Gift Cards',
      description: 'Purchase digital gift cards for popular platforms and games.',
      icon: <Gift className="h-8 w-8 text-purple-400" />,
    },
    {
      name: 'Fast Delivery',
      description: 'Receive your codes and credits within seconds after payment.',
      icon: <Zap className="h-8 w-8 text-yellow-400" />,
    },
    {
      name: 'Secure Payment',
      description: 'Shop with confidence using our secure and trusted payment system.',
      icon: <CreditCard className="h-8 w-8 text-green-400" />,
    },
    {
      name: '24/7 Support',
      description: 'Our support team is ready to help you anytime, anywhere.',
      icon: <Users className="h-8 w-8 text-pink-400" />,
    },
    {
      name: 'Promos & Discounts',
      description: 'Enjoy regular promotions and exclusive discounts for members.',
      icon: <Sparkles className="h-8 w-8 text-orange-400" />,
    },
  ];

  const qnaList = [
    {
      question: "Apakah Diamonds/Chips/Item Game dari vocihub.com Legal?",
      answer: (
        <span>
          Semua Diamonds, item dalam game, dan voucher yang dijual di vocihub.com <b>100% legal dan bersumber dari developer/publisher</b>. Jangan khawatir, berbelanja di Tokogame.com dijamin aman.
        </span>
      ),
    },
    {
      question: "Bagaimana Cara Top-Up Diamonds atau Beli Voucher?", 
      answer: (
        <span>
          Cukup pilih game Anda, pilih item atau voucher yang diinginkan, masukkan ID pemain, dan selesaikan pembayaran. Pesanan Anda akan diproses secara instan!
        </span>
      ),
    },
    {
      question: "Apakah Bisa Bayar Menggunakan QRIS?",
      answer: (
        <span>
          Ya, vocihub.com mendukung berbagai metode pembayaran termasuk QRIS dan Virtual Account.
        </span>
      ),
    },
    {
      question: "Pembayaran Berhasil, Tapi Item Belum Diterima?",
      answer: (
        <span>
          Silakan hubungi layanan pelanggan kami dengan detail pesanan Anda. Kami akan membantu menyelesaikan masalah Anda secepatnya.
        </span>
      ),
    },
    {
      question: "Mengapa Harus Beli di vocihub.com?",
      answer: (
        <span>
          Kami menawarkan pengiriman cepat, pembayaran aman, dan hanya produk resmi dan legal. Kepuasan dan keamanan Anda adalah prioritas kami!
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col bg-white text-gray-900">
      {/* Hero Section as Simple Carousel */}
      <section className="relative mb-12 mt-32 max-h-[600px]">
        <div className="w-full mx-auto">
          <Slider
            {...sliderSettings}
            className="h-full max-h-[600px] [&_.slick-list]:h-full [&_.slick-slide.slick-active]:opacity-100 [&_.slick-slide]:ml-0 [&_.slick-slide]:opacity-70 [&_.slick-slide]:px-2 [&_.slick-track]:h-full [&_.slick-dots]:bottom-[-40px] [&_.slick-prev]:left-4 [&_.slick-next]:right-4 [&_.slick-prev]:z-10 [&_.slick-next]:z-10 [&_.slick-prev]:bg-white/20 [&_.slick-next]:bg-white/20 [&_.slick-prev]:rounded-full [&_.slick-next]:rounded-full [&_.slick-prev]:w-10 [&_.slick-next]:w-10 [&_.slick-prev]:h-10 [&_.slick-next]:h-10 [&_.slick-prev]:flex [&_.slick-next]:flex [&_.slick-prev]:items-center [&_.slick-next]:items-center [&_.slick-prev]:justify-center [&_.slick-next]:justify-center [&_.slick-prev]:hover:bg-white/30 [&_.slick-next]:hover:bg-white/30 [&_.slick-prev]:transition-all [&_.slick-next]:transition-all [&_.slick-prev]:duration-300 [&_.slick-next]:duration-300"
          >
            {heroSlides.map((slide) => (
              <div key={slide.key} className="relative aspect-[2/1] flex items-center justify-center px-2">
                <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl">
                  <img src={slide.bg} alt="" className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="relative z-10 flex flex-col items-center justify-center text-center w-full h-full p-6 md:p-16">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg tracking-tight">{slide.title}</h2>
                    <span className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium drop-shadow-lg max-w-2xl">{slide.subtitle}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Featured Products Section */}
      <section ref={servicesRef} className="py-24 relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#f77a0e]/10 text-[#f77a0e] rounded-full text-sm font-medium mb-4 border border-[#f77a0e]/20">
              Produk Unggulan
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r text-[#f77a0e] bg-clip-text text-transparent">Voucher Game Terpopuler</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pilih dari berbagai macam voucher digital dan kredit game yang kami sediakan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <Card className="group cursor-pointer bg-white border-gray-100">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium text-sm">
                          {formatPrice(product.price)}
                        </span>
                        <Button className="bg-[#f77a0e] hover:bg-[#f77a0e]/90 text-white text-sm px-4 py-2 rounded-full transition-all duration-300">
                          Lihat Detail
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-[#f77a0e] transition-colors duration-200">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* QnA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#f77a0e]/10 text-[#f77a0e] rounded-full text-sm font-medium mb-4 border border-[#f77a0e]/20">
              Pertanyaan Umum
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r text-[#f77a0e] bg-clip-text text-transparent">Frequently Asked Questions</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Temukan jawaban untuk pertanyaan yang sering diajukan tentang layanan kami
            </p>
          </div>

          <div className="space-y-4">
            {qnaList.map((qna, idx) => (
              <div 
                key={qna.question} 
                className="group relative"
              >
                <button
                  className={`w-full flex items-center justify-between p-6 text-lg sm:text-xl font-semibold rounded-2xl transition-all duration-300 ${
                    openQna === idx 
                      ? "bg-white shadow-lg border border-[#f77a0e]/20" 
                      : "bg-white/50 hover:bg-white/80 border border-gray-100"
                  }`}
                  onClick={() => setOpenQna(openQna === idx ? null : idx)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openQna === idx 
                        ? "bg-[#f77a0e] text-white" 
                        : "bg-[#f77a0e]/10 text-[#f77a0e]"
                    }`}>
                      <span className="text-lg font-bold">{idx + 1}</span>
                    </div>
                    <span className="text-left font-[600] text-gray-800 group-hover:text-[#f77a0e] transition-colors duration-200">
                      {qna.question}
                    </span>
                  </div>
                  <ChevronRight 
                    className={`ml-2 h-6 w-6 transition-all duration-300 ${
                      openQna === idx 
                        ? "rotate-90 text-[#f77a0e]" 
                        : "text-gray-400 group-hover:text-[#f77a0e]"
                    }`} 
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openQna === idx ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-6 pt-4 bg-white/50 rounded-b-2xl border-x border-b border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#f77a0e]/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-[#f77a0e]" />
                      </div>
                      <div className="text-gray-600 leading-relaxed">
                        {qna.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-500 mb-4">Masih punya pertanyaan?</p>
            <a
              href="https://wa.me/6285811959392"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#f77a0e] rounded-full font-medium hover:bg-[#f77a0e]/90 transition-all duration-300 shadow-lg shadow-[#f77a0e]/20 hover:shadow-xl hover:shadow-[#f77a0e]/30 hover:-translate-y-0.5"
            >
              <img src="/wa_img.png" alt="WhatsApp" className="w-6 h-6" />
              Chat dengan Kami
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    name: 'Instant Delivery',
    description: 'Get your game vouchers and credits instantly after purchase.',
    icon: <Zap className="h-6 w-6 text-blue-400" />,
    benefits: [
      'Digital delivery within minutes',
      'No waiting time',
      '24/7 availability'
    ]
  },
  {
    name: 'Secure Payments',
    description: 'Shop with confidence using our secure payment system.',
    icon: <Shield className="h-6 w-6 text-blue-400" />,
    benefits: [
      'Multiple payment methods',
      'SSL encryption',
      'Secure checkout process'
    ]
  },
  {
    name: 'Wide Selection',
    description: 'Access to all major gaming platforms and titles.',
    icon: <Gamepad2 className="h-6 w-6 text-blue-400" />,
    benefits: [
      'All major gaming platforms',
      'Popular game titles',
      'Regular new additions'
    ]
  },
]
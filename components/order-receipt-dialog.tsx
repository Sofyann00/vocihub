import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Receipt } from "lucide-react"

interface OrderReceiptDialogProps {
  isOpen: boolean
  onClose: () => void
  order: any
}

export function OrderReceiptDialog({
  isOpen,
  onClose,
  order
}: OrderReceiptDialogProps) {
  if (!order) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <div className="flex items-center justify-center space-x-3 pb-4 border-b">
            <div className="rounded-full bg-blue-100 p-2">
              <Receipt className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900">Order Receipt</h2>
              <p className="text-sm text-gray-500">Order #{order.id}</p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Order Date</span>
                  <span className="font-medium text-sm">
                    {new Date(order.date).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Status</span>
                  <span className={`font-medium px-3 py-1 rounded-full text-xs ${
                    order.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-gray-600 font-medium">Total Amount</span>
                  <span className="font-bold text-lg text-gray-900">
                    Rp {order.total.toLocaleString('id-ID')},-
                  </span>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Product Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Game</span>
                  <span className="font-medium text-sm text-right max-w-[200px]">{order.productName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Package</span>
                  <span className="font-medium text-sm text-right max-w-[200px]">{order.itemName}</span>
                </div>
                {order.items && order.items.length > 0 && order.items[0].playerId && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Player ID</span>
                    <span className="font-medium text-sm">{order.items[0].playerId}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Items List */}
            {order.items && order.items.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Items Purchased</h3>
                <div className="space-y-3">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-gray-500 text-xs">Quantity: {item.quantity}</p>
                      </div>
                      <span className="font-medium text-sm ml-4">
                        Rp {item.price.toLocaleString('id-ID')},-
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-gray-500 mb-2">Thank you for your purchase!</p>
            <p className="text-xs text-gray-400">If you have any questions, please contact our support team.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
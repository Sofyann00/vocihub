import { Dialog, DialogContent } from "@/components/ui/dialog"
import { CheckCircle2 } from "lucide-react"

interface PaymentSuccessDialogProps {
  isOpen: boolean
  onClose: () => void
  paymentData: any
  productData: any
  selectedItem: any
}

export function PaymentSuccessDialog({
  isOpen,
  onClose,
  paymentData,
  productData,
  selectedItem
}: PaymentSuccessDialogProps) {
  if (!paymentData || !productData || !selectedItem) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Success Icon */}
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Payment Successful!</h2>
            <p className="text-gray-500">Thank you for your purchase</p>
          </div>

          {/* Payment Details */}
          <div className="w-full space-y-4">
            <div className="rounded-lg border p-4 space-y-3">
              <h3 className="font-semibold text-gray-900">Payment Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount Paid</span>
                  <span className="font-medium">
                    Rp {paymentData?.inputAmount?.toLocaleString('id-ID') ?? '0'},-
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Fee</span>
                  <span className="font-medium">
                    Rp {paymentData?.fee?.amount?.toLocaleString('id-ID') ?? '0'},-
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Method</span>
                  <span className="font-medium capitalize">
                    {paymentData?.paymentFiat?.bankName ?? ''}
                  </span>
                </div>
                <div className="flex justify-between"><span className="text-gray-500">Transaction ID</span><span className="font-medium" title={paymentData?.depositId ?? 'Unknown'}>{(paymentData?.depositId ?? 'Unknown').length > 15 ? `${(paymentData?.depositId ?? 'Unknown').substring(0,15)}...` : (paymentData?.depositId ?? 'Unknown')}</span></div>
              </div>
            </div>

            {/* Product Details */}
            <div className="rounded-lg border p-4 space-y-3">
              <h3 className="font-semibold text-gray-900">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Game</span>
                  <span className="font-medium">{productData?.name ?? 'Unknown'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Package</span>
                  <span className="font-medium">{selectedItem?.name ?? 'Unknown'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Player ID</span>
                  <span className="font-medium">{selectedItem?.playerId ?? 'Unknown'}</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-sm text-gray-500">
              <p>A confirmation email has been sent to your registered email address.</p>
              <p className="mt-1">Your purchase will be processed shortly.</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
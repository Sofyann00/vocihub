"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { CheckCircle2, XCircle } from "lucide-react"
import { checkRedeemCode } from "@/lib/redeem"

interface RedeemCodeProps {
  onPointsUpdate: (points: number) => void
}

export function RedeemCode({ onPointsUpdate }: RedeemCodeProps) {
  const [code, setCode] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<'success' | 'error'>('success')
  const [dialogMessage, setDialogMessage] = useState("")

  const handleRedeem = () => {
    const result = checkRedeemCode(code)
    if (result) {
      setDialogType('success')
      setDialogMessage(`Successfully redeemed ${result.points} points! ${result.description}`)
      onPointsUpdate(result.points)
    } else {
      setDialogType('error')
      setDialogMessage("Invalid or expired code. Please try again.")
    }
    setIsDialogOpen(true)
    setCode("")
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Redeem Code</h2>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter your code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleRedeem} className="bg-[#f77a0e] hover:bg-[#f77a0e]/90">
          Redeem
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {dialogType === 'success' ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  Success
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-red-500" />
                  Error
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-base">
              {dialogMessage}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
} 
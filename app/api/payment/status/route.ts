import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const depositId = searchParams.get('depositId')

    if (!depositId) {
      return NextResponse.json(
        { message: 'Deposit ID is required' },
        { status: 400 }
      )
    }

    // Generate timestamp in required format
    const timestamp = new Date().toISOString()
    
    // Your client ID from Rampable
    const clientId = '5879d3ea47df480f87dc14c7f9f1e0de1554187'
    
    // Generate signature string
    const stringToSign = `${clientId}:${timestamp}`
    
    // Private key for signing
    const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDhgq2W4K5QBwNM
yzs4RcB7RLYm5QuLW2TZHqA0ZcyCoPqGGtJhbJ21yMro70LqH+YG7hfEGhRmpWbX
rvWen8h6hcKyy0xJ/F0/Y1fORhVx1AgvEggfFU6vtJPTc/hBV/NkCyOAD7I+LoqT
NJWe7+Je8I4I54W/CfHZ7uqAvylMBuVB1aOtK5m8ooX/26+xvWGNBQECioEhWbma
cud0ErGneYxACPkwZ70fRZOBPIeD8uet4JzhKJas1pt4lazaO2bJ0oTsJBFxv1rK
HxYfPx7teZKGLBMWHX+1ZM2qhzJ5c68oG4Nf6v2RrhN4vE+ZlzIc2s3EEoa1MYgd
8fGr553zAgMBAAECggEAJZ8tAaZTPmOlH8sqAo3UelwwvVVp8yJYtUZAOO2gzEw5
72SLI5jAyOKKQ4kjEzcmI5LWIS+upp9ChIoaTQ/gHNyy6iwzeoZhMiGLNQ0JJ9fV
U7EA7NqbqYGJRfYrfQ9EujSHhCZaOLiAAuX7biwcCnW8ZGznqcLpd8+9jKQXqiiO
Dbu6NvVixBwrHrH4+1cv5IZSBWXdlTp0taJbjvoirv2cGoeGMz1u0e+MExE8MVQs
j1LFh36WP8jbwO3itGA6ZGWhDbOXA2ZpF82bbGH9Sr/PMTM9HoM4PzDY7298pzKL
32mdHdIM8NzhKisPgPjh41w+8XnxBW19HkSJQeLfHQKBgQD9u5iygnOLH4bgNnpT
t2Ow/gLW8qMv76hZWOrQgGdC5VQVwLpU0k45+1Q3n/td0K+qwiS67iScOW3FsG4I
1RgVzqwLzi4lAS7m1RhDUgqnTz+0iuykihWf4v/C6U5uyinKusJKuLx7AqwNUexC
bOh7/5kmPvzxJhU/F/HQfxp97QKBgQDjhoYu4e7vVRNUhNU1gD2uRVGYnoXJErED
uHx7vhHgyHAa+rWK3P1+5M8vftZLRlqwol6FieH5n2QFxj5Kd067WWRqr6QS7tnY
XUAo4mibVLnr0a1mtYNO7LjKu8ec4gjPh+aPl4B9LOUDWjykkguoWktaPF+8vvIU
ds6PnDoPXwKBgAVJ4bbmzS27LH6D5CzWh7dqs/hy+j/HiQTDu7E42+4jBYumhru5
3nOK74hxRzX/YYn3nfhfelffQpB6SvDYMDZUJnXgiEmxKp8ZFfZhQWOXXUaQFrqf
PjAk9RvE7SOWByT4m5AfJZ6Swa9NY9VGm9npy/FmIrOMDalRAHNOEulJAoGBAL7F
PqD0o0hdBvYo4jQXsJ/8UywqTnaHi5BZEVcXyRm2NfkJGUqzfID3DJkAOmGnPcc4
fRRuxeBtOop07Cm323XOwBmL54BQcKuvlGozXA5RfgoyJrglnVGBvneN9xKdm1GW
20SufPd3uxWShaJfKhMgkmm4kXVKjOOHsi5LiYr1AoGBALjtdT6qMKafR7AKGf/6
z4jQE8U3TgU/6H+r7GgysY4wednOz98585BMBJbviTzeDLUWjpu0cG/54gnMNQKM
e93CxROfKOS9zkRb1tu9AbuBUg9aNqQw9d8jx3cHYJHEx3rPiXAmEifBCvG7PeL/
VZLJs+xxwAgjusTOGAQU8mp7
-----END PRIVATE KEY-----`
    
    const sign = crypto.createSign('SHA256')
    sign.update(stringToSign)
    const signature = sign.sign(privateKey, 'base64')

    const response = await fetch(`https://sandbox.mayaramp.com/v1/deposit/${depositId}`, {
      headers: {
        'X-Bypass-Secret': 'YZKNsyPLlvQJ5FwRNPrnLo0UsQZzEOgm',
        'X-SIGNATURE': signature,
        'X-TIMESTAMP': timestamp,
        'X-CLIENT-ID': clientId
      }
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to check payment status' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 
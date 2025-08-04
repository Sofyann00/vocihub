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
    const clientId = '5293441ce1ac477bb38f0e70b92abe103337719'
    
    // Generate signature string
    const stringToSign = `${clientId}:${timestamp}`
    
    // Private key for signing
    const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDeOA1T9Qvd3jpb
V6a/jPlx1aS1lZlFaFpY47lCtVvR+mx3GJRYXD47HgvaFDZUM+5pe9M5NGhGIEqV
LTjxCIbdyt6IW1+8ZhTMyGtWtU5ngoEZkkfZGt2tSySzuRclYTrDOipHc2q+ZOZ/
K26zfMbQdcQ5UqRfkWehR0vjnDtx7U1BiNFMoPyW47P2DZiu6uJ5QR5HE+b3ufXn
lTruiHqJUj6P6JDcIB6uKvsDCQq36pZmQ9TH4oGO+4xnTak4smFeFbd8VI0se6+t
bxI4/X4014+CcW6fXu30s0ZxlMoilX8Cbg0XvgRjZvgkU2TiMEcw21shKVoqBgvL
04uoE0DtAgMBAAECggEAL6OZGd1f+qPMY24mSYzdoh2QxrvoRKSzL7i8K/So11pm
G98ZWFsIHVDa7hjkr8cFTrhUxz/4tcXw70unWCcBkLVP4TAjlUZWIbO6rTdHtHGa
HyMIw56alO7V0rC0qVcPi7BhxXkVEnWbo3oqbJCsp56Dn11b70ADFSRtfMFuzgSQ
5hm8v76yTab/Kznnqle0Px14vEjPT0OiyRMFFe/nVXor9A+B2Plc2kdFn+va/la8
q8t0OVWDdo7I+pUo4eRg0vcvCP60nxi4fjel3I725oGQQ28IzzCwSzQoH3cA+0qT
g0f30VNCQOK1K/Eo5muRAEf4RsB8GlJmWxtuiGfAGQKBgQD6nMJMURMdnSP5d7w0
0R3WgLHaFgy30Ft7IaxvT2S6YXA6BXalKim5CBDHu1ak0/Ibg7tMeGv09f4Z3xVD
xnJtmT+GONh3XlIYqKT7qFdooPLZLaHI6LDX6aXMDkspnWXoJNbE62rk55jLwJ+o
juXrljB6vWiDcLL4nAtfb8pAaQKBgQDi/wfRKQaNWAchbupSFTHwbb5pSg7r/W4R
FBuxV95YuNueb3XhgDl7D3n53L6mCwE9VE/WbEjJUVO2wPngUFl50Z5Zh1gkZ2dV
pvG+oHxnkpUIFrxpIRz/VlaInJTERzAhYktpnxoKMcBjYKq0mk6p+a5ljIprgZT8
bbSHKeYr5QKBgQCNLH0vbIRuLDU1tMNqpVo/mWOWzNEBQvgllsSCN6EwdO85YBaD
2AqE1wxM1zVpyJMb+MsrurJl3aT0gfyCn2maX7evLpqSM6nfhjDaKuyCXhgvS0tV
1+620kG5f1vL54SejxIE//DJXcVvEeVemJDgc0x/9+7GDFhlP9IQQvMV8QKBgQCv
HGhuXUS1swvFKehPrBQbUr3KQZxjRt0rBaUbWRqovOqHPZrle+Jb4aOKMlVMiD7L
jggM9Pnte/Sljhb1iWaNCD0s+bDwXGil9aSWFv4BdF3NoKR2QVo6S+Nzfb9x7yzd
BBQDBf6zkI/G2iK2Mjeu/nMf2ZxKtOs3FHZostTiVQKBgQCNkr2YvHyi4r1pPabg
mdhnIA8qynZrhPC3CWeXdL5Z3Qoja+6zvAe7qIJKkfObcBLyDZI5UR364FNhzZx7
eP/EmsvWh421zt+D4GzgWgndom169WVgYqz4nWDVZYFY1cJqVmSwbdxEgmx/JrR0
RN7VeOMYKYv8bPnlur1dVr7Pog==
-----END PRIVATE KEY-----`
    
    const sign = crypto.createSign('SHA256')
    sign.update(stringToSign)
    const signature = sign.sign(privateKey, 'base64')

    const response = await fetch(`https://api.mayaramp.com/v1/deposit/${depositId}`, {
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
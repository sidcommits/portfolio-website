import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: '#0D0D0D',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            color: '#FAF8F5',
            fontWeight: 800,
            fontSize: 13,
            letterSpacing: -0.5,
            fontFamily: 'sans-serif',
            lineHeight: 1,
            marginBottom: 4,
          }}
        >
          SD
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 5,
            left: 7,
            right: 7,
            height: 2.5,
            borderRadius: 2,
            background: '#FF4500',
          }}
        />
      </div>
    ),
    { ...size }
  )
}

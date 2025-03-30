import React from 'react'
import { Outlet } from 'react-router-dom'

export function RootLayout() {
  return (
    <>
        <h1 className="text-3xl font-bold underline">Nav</h1>
        <Outlet />
        <div>Footer</div>
    </>
  )
}
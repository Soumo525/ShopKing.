import React from 'react'
import { useAuth } from '../Auth/AuthProvide'
import { Navigate, Outlet } from 'react-router'

export const Private = () => {
    const {user} = useAuth()
    return user ? <Outlet /> : <Navigate to ="/admin" />;
}
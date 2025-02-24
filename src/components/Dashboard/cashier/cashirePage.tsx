'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Suspense } from 'react'
// import PrintQRCodeModal from './component/printqrcode'



import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import QrCodeIcon from '@mui/icons-material/QrCode';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import Navbar from '@/components/Dashboard/Chef/components/Navbar'




const styling = {
  container: {
    paddingRight: 2,
    paddingBottom: 2
  },
};

const buttonStyle = {
  bgcolor: '#FF0000',
  border: '1px black solid',
  p: 1,
  '&:hover': {
    bgcolor: '#FBFADA',
  },
};


export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`/api/posts`)
      setPosts(res.data)
    } catch (error) {
      console.error(error)
    }
  }


  const getTableColor = (status: string) => {
    return status === 'EATING' ? '#FF0000' : '#00FF00';
  };



  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <CssBaseline />

      <Grid container sx={{ flexGrow: 1 }}>
        <Grid item xs={12} sm={8} md={8}>

          <Box
            height='auto'
            bgcolor={'#FFFFFF'}
            my={0}
            gap={0}
            p={5}
            sx={{ borderTop: '3px solid #12372A' }}
          >
            <Grid spacing={5} alignItems='center' justifyContent='center' container>
              {posts.map((table: any) => (
                <Grid key={table.id} item xs={12} sm={6} md={4} sx={styling.container} textAlign='center'>
                  <Button
                    sx={{
                      ...buttonStyle,
                      bgcolor: '#FFFFFF',
                      border: `1px solid ${getTableColor(table.status.name)}`,
                      boxShadow: '0px 2px 5px 3px rgba(0, 0, 0, 0.38)',
                      p: 2,
                    }}
                    variant="contained"
                    href={`http://localhost:3000/dashboard/cashier/table/${table.id}`}
                  // onClick={() => handleTableClick(table)}
                  >
                    <Box
                      height={80}
                      width={100}
                      display='flex'
                      flexDirection='column'
                      justifyContent='center'
                      alignItems='center'
                      sx={{ border: '0px solid #12372A' }}
                    >
                      <Typography fontSize={20} sx={{ color: '#6D6F6F' }}>{table.name}</Typography>
                      <Typography sx={{ color: '#436850' }}>{table.status.name}</Typography>

                      <TableRestaurantIcon sx={{ fontSize: 'large', color: '#6D6F6F' }} />
                    </Box>

                  </Button>
                </Grid>
              ))}
            </Grid>

          </Box>


        </Grid>

        <Grid item xs={12} sm={4} md={4}>
          {/* ส่วนแสดงรายละเอียดโต๊ะ */}
          <Suspense fallback={<h1>Loading...</h1>}>
            <Box
              bgcolor='#EEEEEE'
              height='70vh'
              my={0}
              display="flex"
              flexDirection="column"
              gap={1}
              p={1}
              sx={{
                border: '3px solid #12372A',
                '@media (max-width: 598px)': {
                  bgcolor: '#EEEEEE',
                  height: 'auto',
                  my: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  p: 1
                }
              }}
            >

            </Box>
          </Suspense>
          {/* ส่วนแสดงปุ่ม ปริ้น QR, ปุ่ม Checkout */}
          <Box
            bgcolor='#EEEEEE'
            height='auto'
            my='0rem'
            display="flex"
            flexDirection="column"
            gap='1rem'
            p='1rem'

            sx={{ border: '3px solid #12372A', alignItems: 'center' }}
          >
            <Button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"

              variant="contained" disabled
              // onClick={handleOpenPrintQRCode}
              startIcon={<QrCodeIcon sx={{ fontSize: 'large', color: 'white' }} />}
            >
              Print QRCODE
            </Button>

            {/* <PrintQRCodeModal open={openPrintQRCode} onClose={handleClosePrintQRCode} selectedTable={selectedTable} /> */}




            <Button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded-full"
              variant="contained" disabled

              startIcon={<PointOfSaleIcon sx={{ fontSize: 'large', color: 'white' }} />}
            >
              Checkout
            </Button>

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

import React, { useEffect } from 'react'
import Banner from '../../components/Banner/Banner'
import PhoneDis from '../Display/PhoneDis'
import Box from '../Box/Box'
import TshirtDis from '../Display/TshirtDis'
import PhoneC from '../Card/PhoneC'
import TshirtC from '../Card/TshirtC'
import GiftC from '../Card/GiftC'
import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';
import CountDown from '../../features/Countdown/Countdown'

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  return (
    <>
        <Banner />
        <CountDown />
        <br/>
        <Box />
        <br/>
        <PhoneDis />
        <br/>
        <TshirtDis/>
        <br/>
        <PhoneC />
        <br/>
        <TshirtC />
        <br/>
        <GiftC/>
        <div className="fixed bottom-4 right-4 z-50">
                <WhatsAppWidget phoneNumber="+917980236947" />
        </div>

    </>
  )
}

export default Home
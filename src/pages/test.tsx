import { useEffect, useState } from 'react';
import { Layout } from 'components/common'
import { Device } from '@capacitor/device';

export default function Page() {

  const [device, setDevice] = useState({} as any)

  useEffect(() => {
    const fetchDevice = async () => {
      const info = await Device.getInfo();
      setDevice(info);
    }
    fetchDevice()
  },[])

  return <pre>{JSON.stringify(device, null, 4)}</pre>
}

Page.Layout = Layout
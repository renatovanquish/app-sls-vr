import { Clipboard } from '@capacitor/clipboard';
import { Component } from 'react';
import { toast } from "react-toast";

export default function TabIntegration(props: any) {
    const { relationID } = props
    const endPoint = `${process.env.URL}api/hotmart/${relationID}`

    const writeToClipboard = async () => {
        await Clipboard.write({
          string: endPoint
        });
        toast.info('Link copiado para área de transferência.')
      };

    return (<div className="">
        <div className='font-semibold text-lg'>Hotmart Webhook</div>
        <div className='text-sm'>Notificação de compra aprovada e cancelada.</div>
        <div className='bg-accent-1 text-accent-8 p-4 rounded-lg'>{endPoint}</div>
        <button onClick={writeToClipboard} className='mt-2 btn'>COPIAR ENDPOINT</button>
    </div>)
}
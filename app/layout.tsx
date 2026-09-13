import type {Metadata,Viewport} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Mah Boobs · The Matching Room',description:'A stacked solitaire matching game. Find two halves, clear the table, and keep your streak alive.'};
export const viewport:Viewport={width:'device-width',initialScale:1,viewportFit:'cover',themeColor:'#101a18'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}

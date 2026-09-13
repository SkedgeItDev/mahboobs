import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Mah Boobs · The Matching Room',description:'A stacked solitaire matching game. Find two halves, clear the table, and keep your streak alive.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}

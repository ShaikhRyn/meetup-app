import { QRCodeCanvas } from 'qrcode.react';
import { motion } from 'framer-motion';
import { Download, Share2 } from 'lucide-react';

interface QRTicketProps {
  ticketNumber: string;
  qrCode: string;
  eventName: string;
  attendeeName: string;
  eventDate: string;
}

export function QRTicket({ ticketNumber, qrCode, eventName, attendeeName, eventDate }: QRTicketProps) {
  const handleDownload = () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `ticket-${ticketNumber}.png`;
    link.href = url;
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white max-w-md shadow-2xl"
    >
      {/* Ticket Header */}
      <div className="text-center mb-6">
        <h3 className="text-sm font-semibold text-blue-100">EVENT TICKET</h3>
        <p className="text-lg font-bold mt-1">{eventName}</p>
      </div>

      {/* QR Code */}
      <div className="bg-white p-6 rounded-xl flex justify-center mb-6">
        <QRCodeCanvas value={qrCode} size={200} level="H" includeMargin={true} />
      </div>

      {/* Ticket Details */}
      <div className="space-y-3 mb-6 text-sm">
        <div className="flex justify-between">
          <span className="text-blue-100">Attendee</span>
          <span className="font-semibold">{attendeeName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-100">Date</span>
          <span className="font-semibold">{eventDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-100">Ticket #</span>
          <span className="font-mono font-semibold">{ticketNumber}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="flex-1 bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 bg-blue-500/30 text-white font-semibold py-2 rounded-lg hover:bg-blue-500/50 transition flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share
        </motion.button>
      </div>
    </motion.div>
  );
}

// In src/components/QuoteCalculatorModal.tsx

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react'; // Keep the X icon import
import { Link } from 'react-router-dom'; // Add the correct Link for navigationimport emailjs from '@emailjs/browser';
import { supabase } from '../supabaseClient'; // Import the Supabase client
import emailjs from '@emailjs/browser';

interface Actor {
  id: string; // Add this line
  ActorEmail: any;
  ActorName: string;
  BaseRate_per_Word: string;
  WebMultiplier: string;
  BroadcastMultiplier: string;
}

interface ModalProps {
  actor: Actor;
  onClose: () => void;
}

const QuoteCalculatorModal: React.FC<ModalProps> = ({ actor, onClose }) => {
  // Step 1: State Management for the Multi-Step Form
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('');

  // Step 2: State for Quote Details
  const [scriptText, setScriptText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [usage, setUsage] = useState('web');
  const [videoSync, setVideoSync] = useState(false); // Upsell state
  const [totalPrice, setTotalPrice] = useState(0);
  // --- NEW: State to hold the ID of the created order ---
    const [newOrderId, setNewOrderId] = useState<string | null>(null);
  // Step 3: State for Client Information
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  const orderId = `VO-${Date.now()}`;

  // Effect to auto-count words from the script text area
  useEffect(() => {
    const words = scriptText.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
  }, [scriptText]);

  // Effect to recalculate the total price whenever a variable changes
  useEffect(() => {
    const baseRate = parseFloat(actor.BaseRate_per_Word) || 0;
    const webMultiplier = parseFloat(actor.WebMultiplier) || 1;
    const broadcastMultiplier = parseFloat(actor.BroadcastMultiplier) || 1;
    const videoSyncFee = 500; // Example fee in MAD for video sync

    const basePrice = wordCount * baseRate;
    const usagePrice = basePrice * (usage === 'web' ? webMultiplier : broadcastMultiplier);
    const finalPrice = usagePrice + (videoSync ? videoSyncFee : 0);

    setTotalPrice(finalPrice);
  }, [wordCount, usage, videoSync, actor]);

  const handleClientInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientInfo({ ...clientInfo, [e.target.name]: e.target.value });
  };
  
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending your order...');
    setStep(4); // Move to the confirmation/loading view
try {
            // This is the key part: .select().single() returns the newly created order object
            const { data: newOrder, error: orderError } = await supabase
                .from('orders')
                .insert({
                    order_id_string: orderId,
                    actor_id: actor.id,
                    client_name: clientInfo.name,
                    client_email: clientInfo.email,
                    word_count: wordCount,
                    usage: usage,
                    total_price: totalPrice,
                    script: scriptText,
                    status: 'Awaiting Payment'
                })
                .select()
                .single();

        if (orderError) throw orderError;
        // --- NEW: Save the new order's UUID to state ---
            if (newOrder) {
                setNewOrderId(newOrder.id);
            }

    // 1. Admin/Actor Email Parameters (includes everything)
    const adminParams = {
        orderId,
        actorName: actor.ActorName,
        actorEmail: actor.ActorEmail, // The new field for the CC
        wordCount,
        usage,
        videoSync: videoSync ? 'Yes' : 'No',
        totalPrice: totalPrice.toFixed(2),
        clientName: clientInfo.name,
        clientEmail: clientInfo.email,
        clientPhone: clientInfo.phone,
        clientCompany: clientInfo.company,
        script: scriptText,
    };

    // 2. Client Confirmation Email Parameters (simpler version)
    const clientParams = {
            orderId: newOrder.order_id_string, // The human-readable ID
            order_uuid: newOrder.id, // The secure UUID for the link
            actorName: actor.ActorName,
            totalPrice: totalPrice.toFixed(2),
            clientName: clientInfo.name,
            clientEmail: clientInfo.email,    };

        // 3. Send the first email to Admin (and CC to Actor)
        await emailjs.send(
            'service_r3pvt1s',
            'template_o4hehdi', // Use the Admin template ID
            adminParams,
            'I51tDIHsXYKncMQpO'
        );

        // 4. Send the second email to the Client
        await emailjs.send(
            'service_r3pvt1s',
            'template_shq9k38', // Use the new Client template ID
            clientParams,
            'I51tDIHsXYKncMQpO'
        );

        // If both emails send successfully:
        setStatus('Order Confirmed!');

    } catch (err) {
        console.log('FAILED...', err);
        setStatus('An error occurred. Please contact us directly.');
    }
};

  const renderStep = () => {
    switch (step) {
      // Step 1: Word Count & Usage
      case 1:
        return (
          <div>
            <h2 className="text-3xl font-bold text-center mb-8">Step 1: Project Scope</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="scriptText" className="block mb-2 font-medium">Paste Your Script Here</label>
                <textarea id="scriptText" rows={5} value={scriptText} onChange={e => setScriptText(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" placeholder="Your script..."></textarea>
                <p className="text-right text-slate-400 mt-1">Word Count: {wordCount}</p>
              </div>
              <div>
                <label htmlFor="usage" className="block mb-2 font-medium">Usage Rights</label>
                <select id="usage" value={usage} onChange={e => setUsage(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3">
                  <option value="web">Web & Social Media (1 Year)</option>
                  <option value="broadcast">TV, Radio & Cinema (1 Year)</option>
                </select>
              </div>
            </div>
            <button onClick={() => setStep(2)} className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-lg">Next</button>
          </div>
        );

      // Step 2: Upsells
      case 2:
        return (
          <div>
            <h2 className="text-3xl font-bold text-center mb-8">Step 2: Add-ons</h2>
            <div className="bg-slate-700 p-4 rounded-lg">
              <label htmlFor="videoSync" className="flex items-center cursor-pointer">
                <input type="checkbox" id="videoSync" checked={videoSync} onChange={e => setVideoSync(e.target.checked)} className="h-5 w-5 rounded accent-blue-500" />
                <span className="ml-3 font-medium">Timed Audio Sync (for video)</span>
                <span className="ml-auto font-bold">+500 MAD</span>
              </label>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="w-full mt-8 px-8 py-4 bg-slate-600 rounded-full text-white font-semibold">Back</button>
              <button onClick={() => setStep(3)} className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold">Next</button>
            </div>
          </div>
        );

      // Step 3: Client Information
      case 3:
        return (
          <div>
            <h2 className="text-3xl font-bold text-center mb-8">Step 3: Your Details</h2>
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <input type="text" name="name" placeholder="Full Name" required onChange={handleClientInfoChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" />
              <input type="email" name="email" placeholder="Email Address" required onChange={handleClientInfoChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" />
              <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleClientInfoChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" />
              <input type="text" name="company" placeholder="Company Name (Optional)" onChange={handleClientInfoChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" />
              <div className="flex gap-4 mt-4">
                <button type="button" onClick={() => setStep(2)} className="w-full px-8 py-4 bg-slate-600 rounded-full text-white font-semibold">Back</button>
                <button type="submit" className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold">Confirm Order</button>
              </div>
            </form>
          </div>
        );
        
      // Step 4: Final Confirmation
      case 4:
          return (
                  <div className="text-center">
                      <h2 className="text-3xl font-bold text-green-400 mb-4">{status}</h2>
                      {status === 'Order Confirmed!' && (
                          <div>
                              <p className="text-slate-300 mb-6">Thank you! A confirmation email is on its way. You can also view your order now.</p>
                              
                              {/* --- NEW: View Order Button --- */}
                              {newOrderId && (
                                  <Link
                                      to={`/order/${newOrderId}`}
                                      className="inline-block w-full mb-6 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform"
                                  >
                                      View Your Order
                                  </Link>
                              )}
                     <div className="bg-slate-900 p-6 rounded-lg text-left">                    
                      <p className="mb-2"><span className="font-bold">Order ID:</span> {orderId}</p>
                      <p className="mb-4"><span className="font-bold">Amount Due:</span> {totalPrice.toFixed(2)} MAD</p>
                      <h4 className="font-bold text-lg mb-2 border-t border-slate-700 pt-4">Bank Transfer Details:</h4>
                      <p className="text-sm text-slate-400">Bank Name: Attijariwafa Bank</p>
                      <p className="text-sm text-slate-400">Account Holder: UCPMAROC</p>
                      <p className="text-sm text-slate-400">IBAN: MA64 0077 8000 0219 5000 0005 47</p>
                      <p className="font-bold mt-4">IMPORTANT: Please use your Order ID as the payment reference.</p>
                  </div>
                </div>
              )}
            </div>
          );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700/50 w-full max-w-lg relative transition-all duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X size={24} />
        </button>
        <div className="mb-6 border-b border-slate-700 pb-4">
          <p className="text-center text-slate-400">Booking for: <span className="font-bold text-blue-400">{actor.ActorName}</span></p>
          <p className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mt-2">
            Total: {totalPrice.toFixed(2)} MAD
          </p>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default QuoteCalculatorModal;
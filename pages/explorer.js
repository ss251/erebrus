import React, { useEffect, useState } from "react";
import Link from "next/link";
import NodesData from "../components/NodesData";
import dynamic from 'next/dynamic';
import { motion } from "framer-motion";

const DvpnMap = dynamic(() => import('../components/DvpnMap'), { ssr: false });
const EREBRUS_GATEWAY_URL = process.env.NEXT_PUBLIC_EREBRUS_BASE_URL;

const Explorer = () => {
  const [nodes, setNodes] = useState([]);
  const [activeMap, setActiveMap] = useState('pin');

  useEffect(() => {
    async function fetchNodes() {
      try {
        const response = await fetch(`${EREBRUS_GATEWAY_URL}api/v1.0/nodes/all`);
        const data = await response.json();
        if (data && Array.isArray(data.payload)) {
          setNodes(data.payload);
        } else {
          setNodes([]);
          console.warn("Received invalid data payload from API.");
        }
      } catch (error) {
        console.error("Error fetching nodes data:", error);
        setNodes([]);
      }
    }
    fetchNodes();
  }, []);

  return (
    <div className="bg-[#040819]">
      <div className="mx-auto relative flex flex-col lg:flex-row items-center lg:items-start lg:justify-between p-4 lg:p-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 0% 7%, rgba(86, 150, 255, 0.6) 4%, #0162FF80 10%, black 30%), url("/explorer4.png")',
          backgroundSize: 'cover',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="flex flex-col items-center lg:items-start lg:w-2/3 lg:pr-10 text-left">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
            className="text-6xl font-semibold text-gray-300 mb-8 px-4"
          >
            Decentralized Access with 
            <br />
            Erebrus ÐVPN
          </motion.h1>
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
            className="text-2xl text-white mb-8 px-4"
          >
            <p>
              Unrestricted Uncensored Web Access
            </p>
          </motion.h1>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
            className="text-black font-bold py-3 px-10 rounded-full bg-white text-lg inline-block"
          >
            <Link href="https://discord.com/invite/5uaFhNpRF6" target="_blank" rel="noopener noreferrer">
              Run Your Node
            </Link>
          </motion.div>
        </div>

        <div className="hidden lg:block lg:w-1/3 relative">
          <img 
            src="/gradient-vpn-illustration.png" 
            alt="Decorative GIF" 
            className="w-full h-auto opacity-90 shadow-lg"
            style={{
              animation: 'scaleUpDown 2s infinite'
            }}
          />
        </div>
      </div>

      <div className="pt-16 px-4 lg:px-20 bg-gradient-to-b from-black to-[#20253A]">
        <div className="text-2xl font-semibold text-gray-300 mb-8">
          Erebrus Decentralized VPN (ÐVPN) Network Nodes Overview
        </div>
        <div className="text-white">
          <p>
            Explore the Erebrus decentralized VPN network with our interactive map. View detailed information on active nodes, including their location, network performance, and status. This map provides real-time insights into the global distribution and operation of our secure and private VPN infrastructure.
          </p>
        </div>
      </div>

      <div className="map-page" style={{ height: '100vh' }}>
        <div className="map-container" style={{ height: '100%', width: '100%' }}>
          <DvpnMap nodes={nodes} />
        </div>
      </div>

      <NodesData />
      
      <style jsx>{`
        @keyframes scaleUpDown {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export default Explorer;

import axios from "axios";
import { CheckCircle, CloudOff } from "lucide-react";
import { useEffect, useState } from "react";

export default function SettingsPage() {
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkBackendConnection = async () => {
        setIsLoading(true);

        try {
            const response = await axios.get("http://localhost:8080/api/customers");
            if (response.status === 200) {
                setIsConnected(true);
            } else {
                setIsConnected(false);
            }
        } catch (err) {
            console.error("Connection check failed:", err);
            setIsConnected(false);
        } finally {
            setIsLoading(false);
        }
    };
    const POLLING_INTERVAL = 10000;
    useEffect(() => {
        checkBackendConnection();
        const intervalId = setInterval(checkBackendConnection, POLLING_INTERVAL);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="space-y-5 ">
            <h2 className="text-3xl font-extrabold text-gray-900">Application Settings</h2>
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-full">
                <h3 className="text-xl text-gray-600 font-semibold border-b pb-2 mb-4">Backend Connection Status</h3>
                <p className="text-gray-700 mb-2">
                    <span className="font-medium">Spring Boot URL:</span>{" "}
                    <code className="bg-gray-100 p-1 rounded">http://localhost:8080/api</code>
                </p>

                {isLoading ? (
                    <p className="text-blue-500 font-bold">Checking connection...</p>
                ) : isConnected ? (
                    <p className="text-green-600 font-bold flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" /> Connection OK
                    </p>
                ) : (
                    <p className="text-red-600 font-bold flex items-center">
                        <CloudOff className="w-5 h-5 mr-2" /> Connection Failed
                    </p>
                )}
            </div>
        </div>
    );
}
// 10. Settings/Placeholder Page (Dynamic Page View 10)
import {CheckCircle} from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-5 w-236">
            <h2 className="text-3xl font-extrabold text-gray-900">Application Settings</h2>
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-full">
                <h3 className="text-xl text-gray-600 font-semibold border-b pb-2 mb-4">Backend Connection Status</h3>
                <p className="text-gray-700 mb-2"><span className="font-medium">Spring Boot URL:</span> <code className="bg-gray-100 p-1 rounded">http://localhost:8080/api</code></p>
                <p className="text-green-600 font-bold flex items-center"><CheckCircle className="w-5 h-5 mr-2" /> Connection OK</p>
            </div>
        </div>
    )
}

'use client'

import { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';

export default function Page() {
    const [incomePerMonth, setIncomePerMonth] = useState<any[]>([]);

    useEffect(() => {
        renderChartIncomePerMonth();
    }, []);

    const renderChartIncomePerMonth = () => {
        const data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10000));
        const chartPerMonth = document.querySelector('#chart-income-per-month');
        const chartOptions = {
            series: [{ name: 'รายได้รายเดือน', data: data }],
            chart: { type: 'bar', height: 500 },
            xaxis: {
                categories: [
                    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน',
                    'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม',
                    'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
                ],
                title: {
                    text: 'รายได้รายเดือน',
                    align: 'center'
                }
            },
        };
        const chart = new ApexCharts(chartPerMonth, chartOptions);
        chart.render();
    };

    return <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="bg-gray-100 p-8 rounded-lg mt-4 shadow-2xl">
            <div className="flex gap-4">
                <div className="w-1/4 bg-gradient-to-tr from-green-700 to-blue-500 p-4 rounded-2xl text-right">
                    <div className="text-white">รายได้ทั้งหมด</div>
                    <div className="text-2xl font-bold text-white">100,000</div>
                </div>
                <div className="w-1/4 bg-gradient-to-tr from-indigo-600 to-pink-300 p-4 rounded-2xl text-right">
                    <div className="text-white">รายได้วันนี้</div>
                    <div className="text-2xl font-bold text-white">10,000</div>
                </div>
                <div className="w-1/4 bg-gradient-to-tr from-orange-600 to-teal-400 p-4 rounded-2xl text-right">
                    <div className="text-white">สินค้าทั้งหมด</div>
                    <div className="text-2xl font-bold text-white">8</div>
                </div>
                <div className="w-1/4 bg-gradient-to-tr from-yellow-500 to-blue-700 p-4 rounded-2xl text-right">
                    <div className="text-white">ยอดขาย (รายการ)</div>
                    <div className="text-2xl font-bold text-white">8</div>
                </div>
            </div>

            <div id="chart-income-per-month" className="w-full mt-4"></div>
        </div>
    </div>;
}

import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function DashboardChart() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
       
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        const fetchArticles = async () => {
            try {
                // Substitua esta URL pela sua URL da API real
                const response = await fetch('https://saude-maranhao.onrender.com/diseases'); 
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const labels = data.data.map(e => e.name);
                const instaces = data.data.map(e => e.instaces);

                const dataChart = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Ocorrências',
                            data: instaces, 
                            backgroundColor: [
                                '#379098',
                                '#77a6ba',
                                '#76a5b9',
                                '#73a1b8'
                            ],
                        }
                    ]
                };
                console.log(labels, instaces);

                setChartData(dataChart);
                setChartOptions(options);
            } catch (error) {
                console.error("Erro ao buscar artigos:", error);
                // Você pode adicionar um estado para exibir uma mensagem de erro na UI
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (
        <Chart type="bar" data={chartData} options={chartOptions} />
    )
}
        
import ReactApexChart from "react-apexcharts";



const Chart = ({ option, type, width}) => {


    return (
      <ReactApexChart options={option.options} series={option.series} type={type} width={width} />
      
    )
  
}


export default Chart
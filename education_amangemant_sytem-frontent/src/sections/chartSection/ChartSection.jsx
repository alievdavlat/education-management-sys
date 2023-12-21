import React from 'react'
import { Chart, ChartField } from '../../components'
import { CompaniesAdminsoption, CompaniesBranchessoption, CompaniesPayedsoption, CompaniesStafsoption, branchesEachGroupoption, branchesEachStafoption, branchesEachStudentsoption, unPayedStudentsoption } from '../../utils/constants'
import { getItemAtStorage } from '../../hooks/useStorage'
import { Empty } from 'antd'

const ChartSection = () => {

  const role = getItemAtStorage('role')

  return (
  <div>

    <div className='chart_wrapper'>
        {
          role == 'super_admin'  
          ?
        <>
        
        <ChartField header={'Companies and Each Admins'} width={'700px'} height={380}>
        <Chart type={"pie"} width={380} height={380}  option={CompaniesAdminsoption}/>
        </ChartField>

        <ChartField header={'Companies and Each Branches'} width={'700px'} height={380}>
        <Chart type={"pie"} width={380} option={CompaniesBranchessoption} />
        </ChartField>

        <ChartField header={'Payed and Unpayed Companies'} width={'700px'} height={380}>
        <Chart type={"pie"} width={380} option={CompaniesPayedsoption}/>
        </ChartField>

        <ChartField header={'Companies and Each stafs '} width={'700px'} height={380}>
        <Chart type={"pie"} width={380} option={CompaniesStafsoption}/>
        </ChartField>

        
        </>
          : role == 'eadmin' ? 
          <>
        <ChartField header={'branches and Each stafs'} width={'700px'} height={380}>
        <Chart type={"pie"} width={380} height={380}  option={branchesEachStafoption}/>
        </ChartField>

        <ChartField header={'branches and Each students'} width={'700px'} height={380}>
        <Chart type={"pie"} width={380} option={branchesEachStudentsoption} />
        </ChartField>

        <ChartField header={'Branches and each groups'} width={'700px'} height={380}>
        <Chart type={"pie"} width={380} option={branchesEachGroupoption}/>
        </ChartField>

        <ChartField header={'payed  and unpayed students '} width={'700px'} height={380}>
        <Chart type={"pie"} width={380} option={unPayedStudentsoption}/>
        </ChartField>

          </>
          : role == 'main-teacher' || role == 'assistant' ? 
            <>
              schudel
            </>
             :
             <Empty />
        
        }
       
    </div>


</div>

  )
}

export default ChartSection




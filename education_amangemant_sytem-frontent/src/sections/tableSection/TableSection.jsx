import React from 'react'
import { UseAxios } from "../../hooks/useAxios";
import { getItemAtStorage } from '../../hooks/useStorage'
import { TableInfo } from '../../components'
import { FilterMatchMode } from "primereact/api";

const TableSection = ({page}) => {
  const role = getItemAtStorage('role')
  const [tableLoading, setTableLoading] = React.useState(false);
  const [allCompany, setAllCompany] = React.useState([]);
  const [allnotPayedStudentlist , setAllNotPayedStudentlist] = React.useState([]);
  const [admins, setAdmins] = React.useState(null);
  const [companies , setCompanies] = React.useState([])
  const sAdmin   = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    company_admin: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    payment_status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    created_at: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    company_payed_at: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  }


  
const eadmin = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  last_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  gender: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  dob: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  group_numbers: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
}

const eadminPageOPtion = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  last_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  gender: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  dob: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  t_account: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

}

  const super_admin_dashboard_table = [
 
    {
      id:3,
      header:'company',
      field:'company',
    },
    {
      id:4,
      header:'company_admin',
      field:'company_admin',
    },
    {
      id:5,
      header:'branch_count',
      field:'branch_count',
    }
    , {
      id:6,
      header:'staff_count',
      field:'staff_count',
    }
    ,
    {
      id:7,
      header:'student_count',
      field:'student_count',
    },
    {
      id:8,
      header:'group_count',
      field:'group_count',
     
    }
    , {
      id:9,
      header:'status',
      field:'payment_status',
    }
    ,
    {
      id:10,
      header:'company_payed_at',
      field:'company_payed_at',
      date:true,
      dateparser  (rowData)  {
        return (
          <>
            {
              rowData.company_payed_at ? 
              <>
              <span>{rowData?.company_payed_at?.slice(0, 10)}</span> , 
              <span>{rowData?.company_payed_at?.slice(11, 16)}</span>
              </>
              :
              <>
              <span>unknown</span>
              </>
            }
            </>
            )
        }


    },
    {
      id:11,
      header:'created_at',
      field:'created_at',
      date:true,
      dateparser  (rowData)  {
          return (
            <>
            <span>{rowData?.created_at?.slice(0, 10)}</span> , 
            <span>{rowData?.created_at?.slice(11, 16)}</span>
           </>
          )
        }

    }
  ]

  const super_admin_companies_page = [
 
    {
      id:3,
      header:'company',
      field:'company',
    },
    {
      id:4,
      header:'company_admin',
      field:'company_admin',
    },
    {
      id:5,
      header:'branch_count',
      field:'branch_count',
    }
    , {
      id:6,
      header:'staff_count',
      field:'staff_count',
    }
    ,
    {
      id:7,
      header:'student_count',
      field:'student_count',
    },
    {
      id:8,
      header:'group_count',
      field:'group_count',
     
    }
    , {
      id:9,
      header:'status',
      field:'payment_status',
    }
    ,
    {
      id:10,
      header:'company_payed_at',
      field:'company_payed_at',
      date:true,
      dateparser  (rowData)  {
        return (
          <>
            {
              rowData.company_payed_at ? 
              <>
              <span>{rowData?.company_payed_at?.slice(0, 10)}</span> , 
              <span>{rowData?.company_payed_at?.slice(11, 16)}</span>
              </>
              :
              <>
              <span>unknown</span>
              </>
            }
            </>
            )
        }


    },
    {
      id:11,
      header:'created_at',
      field:'created_at',
      date:true,
      dateparser  (rowData)  {
          return (
            <>
            <span>{rowData?.created_at?.slice(0, 10)}</span> , 
            <span>{rowData?.created_at?.slice(11, 16)}</span>
           </>
          )
        }

    }
  ]

  const eadmin_dashboard_table = [
   
    {
      id:2,
      header:'username',
      field:'username'
    },
    {
      id:3,
      header:'name',
      field:'name'
    },
    {
      id:4,
      header:'last_name',
      field:'last_name'
    },
    {
      id:5,
      header:'dob',
      field:'dob',
      date:true,
      dateparser  (rowData)  {
          return (
            <>
            <span>{rowData?.dob?.slice(0, 10)}</span>
           </>
          )
        }

    },
    {
      id:6,
      header:'gender',
      field:'gender'
    },
    {
      id:7,
      header:'branch',
      field:'branch'
    },
    {
      id:8,
      header:'group_numbers',
      field:'group_numbers',
      select : true,
      BodyTemplatee (rowData) {
        return (
          <>
          {
               <select className="select_table">
                {
                  rowData.group_numbers.map(item => <option value={item}>{item}</option>)
                }
               </select>
          }
          </>
        )
        
      }
    },
    {
      id:9,
      header:'groups',
      field:'groups',
      select : true,
      BodyTemplatee (rowData)  {
        return (
          <>
          {
               <select className="select_table">
                {
                  rowData.groups.map(item => <option value={item}>{item}</option>)
                }
               </select>
          }
          </>
        )
      
        }
    },
    {
      id:10,
      header:'payment_status',
      field:'payment_status'
    },
    {
      id:11,
      header:'student_payed_at',
      field:'student_payed_at',
      date:true,
      dateparser  (rowData)  {
      
          return (
          <>
           <span>{rowData?.student_payed_at?.slice(0, 10)}</span> , 
           <span>{rowData?.student_payed_at?.slice(11, 16)}</span>
          </>
          )
        }

    },

    {
      id:12,
      header:'student_created_at',
      field:'student_created_at' ,
      date: true,
      dateparser  (rowData)  {
        
      
          return (
          <>
           <span>{rowData?.student_created_at?.slice(0, 10)}</span> , 
           <span>{rowData?.student_created_at?.slice(11, 16)}</span>
          </>
          )
        }
    },

  ]

  const eadminsPage = [
    {
      id:1,
      header:'company',
      field:'company',
    },
    {
      id:2,
      header:'username',
      field:'username',
    },
    {
      id:3,
      header:'name',
      field:'name',
    },
    {
      id:4,
      header:'last_name',
      field:'last_name',
    },
    {
      id:5,
      header:'email',
      field:'email',
    },
    {
      id:7,
      header:'dob',
      field:'dob',
      date:true,
      dateparser  (rowData)  {
      
          return (
          <>
           <span>{rowData?.dob?.slice(0, 10)}</span> 
          </>
          )
        }

    },
    {
      id:8,
      header:'gender',
      field:'gender',
    },
    {
      id:9,
      header:'phone',
      field:'phone',
    },
    {
      id:10,
      header:'t_account',
      field:'t_account',
    },
    {
      id:11,
      header:'img',
      field:'img',
      imgField:true,
      imgColBody : (rowData) => {
        return (
          <>
          <div className='table_imgField' title={'show picture'}>
            <img src={rowData.img || `https://ui-avatars.com/api/?name=${rowData.last_name}+${rowData.name}`} alt={'avatar'} />
          </div>
          </>
        )
      }
    },
    {
      id:12,
      header:'created_at',
      field:'created_at',
      date:true,
      dateparser  (rowData)  {
      
          return (
          <>
           <span>{rowData?.created_at?.slice(0, 10)}</span> , 
           <span>{rowData?.created_at?.slice(11, 16)}</span>
          </>
          )
        }

    },
   
  ]
  

  const getData = async () => {
    const axios = UseAxios();

    try {
      setTableLoading(true);
      const res = await axios({ url: "/company/all" });
      const allnotPayedStudents = await axios({url:'/students'})
      const admins = await axios({url:'/admins'})
      const companies = await axios({url:'/company/all'})      

      setCompanies(companies?.data?.data);
      setAllNotPayedStudentlist(allnotPayedStudents?.data?.data)
      setAllCompany(res?.data?.data);
      setAdmins(admins?.data?.data);
      setTableLoading(false);

    } catch (err) {
      console.log(err);
    } finally {
      setTableLoading(false);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div>

    {
      role === 'super_admin' && page === 'dashboard' ? 
        <TableInfo  filterOption ={sAdmin} width={'1300px'} title={'Not payed Companies'} tableLoading={tableLoading} data={allCompany} body={super_admin_dashboard_table} />
        :
      role === 'eadmin' && page === 'dashboard' ? 
        
        <TableInfo filterOption={eadmin} width={'1300px'} title={'Not payed Students'} tableLoading={tableLoading} data={allnotPayedStudentlist} body={eadmin_dashboard_table} />
        :
      page === 'eadmins'  ?

      <TableInfo filterOption={eadminPageOPtion} width={'1600px'} title={'all education admins'} tableLoading={tableLoading} data={admins} body={eadminsPage} />
        
      :
      
      page === 'companies' ? 
      
      <TableInfo filterOption={sAdmin} width={'1600px'} title={'All companies'} tableLoading={tableLoading} data={companies} body={super_admin_companies_page} />
      
      :
      
      ''
    } 
    </ div>
  )

}

export default TableSection





export const themingList = [
  {
    id:1,
    color:'white-purple',
    name:'whitening',
  },
  {
    id:2,
    color:'blue',
    name:'blue',

  },
  {
    id:3,
    color:'black-white',
    name:'black',
  },
  {
    id:4,
    color:'dark',
    name:'dark',
  },
  {
    id:5,
    color:'white',
    name:'white',
  }
]



export const sidebarItemsDetails  = [
  {
    id:1,
    text:'Dashboard',
    icon:`fa-brands fa-slack`,
    view:['super_admin', 'eadmin', 'assistant', 'main-teacher'],
    path:'/dashboard',

  },
  {
    id:2,
    text:'Companies',
    icon:`fa-solid fa-building-wheat`,
    view:['super_admin'],
    path:'/companies'
  },
  {
    id:3,
    text:'Create',
    icon:`fa-regular fa-square-plus`,
    view:['super_admin', 'eadmin'],
    path:'/create'
  },
  {
    id:4,
    text:'Adding',
    icon:`fa-solid fa-circle-plus`,
    view:['eadmin'],
    path:'/adding'
  },
  {
    id:5,
    text:'Admins',
    icon:`fa-solid fa-user`,
    view:['super_admin'],
    path:'/eadmins'
  },

  {
    id:6,
    text:'Branches',
    icon:`fa-solid fa-code-branch`,
    view:['eadmin'],
    path:'/branches'
  },
  {
    id:7,
    text:'Stafs',
    icon:`fa-solid fa-users-rays`,
    view:['eadmin'],
    path:'/stafs',
  },
  {
    id:8,
    text:'Students',
    icon:`fa-solid fa-users-between-lines`,
    view:['eadmin', 'assistant', 'main-teacher'],
    path:'/students'
  },

  {
    id:9,
    text:'Groups',
    icon:`fa-solid fa-users-rectangle`,
    view:['eadmin', 'assistant', 'main-teacher'],
    path:'/groups',
  },
  {
    id:10,
    text:'Courses',
    icon:`fa-solid fa-book-open-reader`,
    view:['eadmin'],
    path:'/courses',
  },

  {
    id:11,
    text:'Archive',
    icon:`fa-solid fa-box-archive`,
    view:['super_admin'],
    path:'/archive',
  },

]


export const countInfoDetails = [
  {
    id:1,
    title:'Companies',
    path:'/companies',
    view:['super_admin'],
    count:'20'
  },

  {
    id:2,
    title:'Branches',
    path:'/branches',
    view:['eadmin'],
    count:'30'
  },

  {
    id:3,
    title:'admins',
    path:'/eadmin',
    view:['super_admin'],
    count:'20'
  },

  {
    id:4,
    title:'Stafs',
    path:'/stafs',
    view:['eadmin'],
    count:'100'
  },

  {
    id:5,
    title:'Students',
    path:'/students',
    view:['main-teacher', 'assistant', 'eadmin'],
    count:'300'
  },

  {
    id:6,
    title:'Groups',
    path:'/groups',
    view:['main-teacher', 'assistant', 'eadmin'],
    count:'50'
  },

  {
    id:7,
    title:'Courses',
    path:'/courses',
    view:['eadmin'],
    count:'70'
  },

  
]





// super_admin

export let CompaniesAdminsoption = {
    
  series: [45, 50],
  options: {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Companies', 'Admins'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  },


};


export let CompaniesBranchessoption = {
    
  series: [45, 50],

  options: {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Companies', 'Branches'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    fill: {
      colors: ['#00E396','#008000']
    },
    colors:['#00E396','#008000']
  },


};

export let CompaniesPayedsoption = {
    
  series: [45, 50],

  options: {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Payed Companies', 'Unpayed Companies'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    fill: {
      colors:['#008FFB','#FF0000']
    },
    colors:['#008FFB','#FF0000']
  },


};



export let CompaniesStafsoption = {
    
  series: [45, 50],

  options: {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Companies', 'stafs'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    fill: {
      colors:['#008FFB','#00E396']
    },
    colors:['#008FFB','#00E396']
  },


};



// admin 


export let branchesEachStafoption = {
    
  series: [45, 50],

  options: {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Companies', 'stafs'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    fill: {
      colors:['#008FFB','#00E396']
    },
    colors:['#008FFB','#00E396']
  },


};


export let branchesEachStudentsoption = {
    
  series: [45, 50],

  options: {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Companies', 'stafs'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    fill: {
      colors:['#008FFB','#00E396']
    },
    colors:['#008FFB','#00E396']
  },


};


export let branchesEachGroupoption = {
    
  series: [45, 50],

  options: {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Companies', 'stafs'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    fill: {
      colors:['#008FFB','#00E396']
    },
    colors:['#008FFB','#00E396']
  },


};


export let unPayedStudentsoption = {
    
  series: [45, 50],

  options: {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Companies', 'stafs'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    fill: {
      colors:['#008FFB','#00E396']
    },
    colors:['#008FFB','#00E396']
  },


};




// tabs item 

export const mainTabItem = [

  {
    id:1,
    title:'archive companies',
  },
  {
    id:2,
    title:'archive admins',
  },
  {
    id:3,
    title:'manage archives',
  },
  {
    id:4,
    title:'statistics',
  }
]
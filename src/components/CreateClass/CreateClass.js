import { Dialog } from '@mui/material'
import React from 'react'
import { useMyContext } from '../../context/context'
import Form from './Form'
import "./style.css"

const CreateClass = () => {
  const {createClassDialog, setCreateClassDialog} = useMyContext()
  return (
      <div>
        <Dialog 
        onClose={()=>setCreateClassDialog(false)}
        aria-labelledby="customized-dialog-title"
        open={createClassDialog}
        maxWidth="lg"
        >
          <Form />
        </Dialog>
      </div>
  )
}

export default CreateClass
"use client"
import React from 'react'
import { useRouter } from 'next/router';
import TeacherListTable from "./TeacherListTable"

const TeacherList = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(router.query);

  return (
    <div>
     <TeacherListTable id={id} />
    </div>
  )
}

export default TeacherList
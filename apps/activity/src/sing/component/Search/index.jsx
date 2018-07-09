import React from 'react'
import { Input, Button } from 'antd'
import {Blank} from '../'
import './index.scss'

export default ({handleClick}) => {
  return (
    <section className='search'>
      <Input placeholder='输入搜索内容' />
      <Blank />
      <Button icon="search" onClick={handleClick}>Search</Button>
    </section>
  )
}

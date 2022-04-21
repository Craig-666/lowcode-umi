import React, {useEffect, useReducer} from "react";
import { Nav,Dialog,Form, Input, Select, Radio, NumberPicker, DatePicker, Switch, Button,Message} from '@alifd/next'
// import {parseParams} from "../../universal/utils";
import {project} from "@alilc/lowcode-engine";
import * as request from '../../utils/request'
// import defaultSchema from 'public/schema.json';

const {Item, SubNav} = Nav;
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

interface IProps {

}

type navItem = {
  name: string,
  id: string,
  children ?: Array<navItem>
  schema?:string
}

interface IState{
  pages: Array<navItem>,
  selectedKeys: string[],
  addVisible: boolean,
}

const unit_id = 'c28e370c-4bd1-4dd9-ad50-774b13386088'
const app_id = '9616d947-76c0-49f1-bf3b-e9a34e47f3f2'

export default (props:any) => {
  const initialState:IState = {
    selectedKeys:[],
    addVisible: false,
    pages: [],
  };

  const reducer = (state:IState, action: any) => {
    return {
      ...state,
      ...action,
    };
  };

  const [{
    pages,selectedKeys,addVisible
  }, setState] = useReducer(reducer, initialState);

  useEffect(()=>{
    // getList()
    // const key = parseParams('page')
    // setState({selectedKeys: [key]})
  },[])

  const getList = async () =>{
    const res: Array<navItem> = await request.get('/api/files')
    setState({
      pages: res
    })
    // const key = parseParams('page')
    // const page = res.find(ele=>ele.id === key)
    // if (page?.schema){
    //   project.importSchema(JSON.parse(page?.schema))
    // }else {
    //   project.importSchema(defaultSchema)
    // }

  }

  const saveFile = async (values,error) =>{
    try {
      if (error)return
      values.app_id = app_id
      values.unit_id = unit_id
      const res = await request.post('/api/files',{params:JSON.stringify(values)})
      setState({addVisible:false})
      Message.success('保存成功')
      getList()
    }catch (e) {
      console.log(e)
    }
  }


  const renderNav = (list:Array<navItem>) =>{
    return list.map((ele:navItem)=>{
      if (ele.children){
        return <SubNav icon="account" label={ele.name} key={ele.id}>
          {
            renderNav(ele.children)
          }
        </SubNav>
      }else {
        return <Item icon="account" key={ele.id}>{ele.name}</Item>
      }
    })
  }


  return <>
    <Button type={'primary'} onClick={()=>{
      console.log(project.exportSchema())
      // saveFile()
      setState({addVisible:true})
    }}>添加页面</Button>
    <Nav type={'line'} selectedKeys={selectedKeys} onSelect={e=>{
      setState({selectedKeys: e})
      location.href = `${location.pathname}?page=${e[0]}`
    }}>
      {
        renderNav(pages)
      }
    </Nav>

    <Dialog
      visible={addVisible}
      title="新增页面"
      footer={false}
      style={{ width: 600 }}
      onClose={()=>{setState({addVisible:false})}}
    >
      <Form fullWidth style={{ paddingLeft: 40, paddingRight: 40 }}>
        <Form.Item label="文件类型" required requiredMessage="请选择页面类型">
          <Radio.Group name={'type'}>
            <Radio value={1}>菜单</Radio>
            <Radio value={2}>页面</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="页面名称" required requiredMessage="请输入页面名称">
          <Input name="name" placeholder="请输入页面名称" />
        </Form.Item>
        {/*<Form.Item label="项目类型" required requiredMessage="请选择项目类型">*/}
        {/*    <Select name="projectType" placeholder="请选择项目类型">*/}
        {/*        <Select.Option value={1}>类型一</Select.Option>*/}
        {/*        <Select.Option value={2}>类型二</Select.Option>*/}
        {/*        <Select.Option value={3}>类型三</Select.Option>*/}
        {/*    </Select>*/}
        {/*</Form.Item>*/}
        {/*<Form.Item label="关联项目" required requiredMessage="请选择关联项目">*/}
        {/*    <Select name="projectId" placeholder="请选择关联项目">*/}
        {/*        <Select.Option value={1}>项目一</Select.Option>*/}
        {/*        <Select.Option value={2}>项目二</Select.Option>*/}
        {/*        <Select.Option value={3}>项目三</Select.Option>*/}
        {/*    </Select>*/}
        {/*</Form.Item>*/}


        <FormItem wrapperCol={{ offset: 6 }}>
          <Form.Submit
            validate
            type="primary"
            onClick={saveFile}
            style={{ margin: "0 10px" }}
          >
            提交
          </Form.Submit>
          <Form.Reset>重置</Form.Reset>
        </FormItem>
      </Form>
    </Dialog>
  </>
}

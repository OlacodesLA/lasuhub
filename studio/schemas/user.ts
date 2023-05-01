import { Document } from './schemaTypes';

export default <Document>{
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string'
    },
    {
      name: 'matric',
      title: 'Matric',
      type: 'string'
    },
    {
      name: 'faculty',
      title: 'Faculty',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'url'
    },
    {
      name: 'password',
      type: 'string',
      hidden: true
    }
  ]
};

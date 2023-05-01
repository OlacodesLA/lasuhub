//@ts-nocheck
  export const categories = [
    { id: 1, name: 'Arts', link:"arts" },
    { id: 2, name: 'Basic Medical Sciences', link:"basic-medical-sciences"},
    { id: 3, name: 'Clinical Sciences', link:"clinical-sciences" },
    { id: 4, name: 'Dentistry', link:"dentistry" },
    { id: 5, name: 'Education', link:"education" },
    { id: 6, name: 'Engineering', link:"engineering" },
    { id: 7, name: 'Law', link:"law" },
    { id: 8, name: 'Management Sciences', link:"management-sciences" },
    { id: 9, name: 'Science', link:"science" },
    { id: 10, name: 'Social Sciences', link:"social-sciences" },
    { id: 11, name: 'Transport', link:"transport" },
  ]


  export const feedQuery = `*[_type == "posts"] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        destination,
        about,
        postedBy->{
          _id,
          name,
          matric,
          level,
          department,
          faculty,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            name,
            level,
            department,
            faculty,
            image
          },
        },
        comments[]{
          comment,
          _key,
          postedBy->{
            _id,
            userName,
            level,
            department,
            faculty,
            image
          },
        }
      } `;



  export const postDetailQuery = (postId) => {
    const query = `*[_type == "posts" && _id == '${postId}']{
      image{
        asset->{
          url
        }
      },
      _id,
      title, 
      about,
      category,
      destination,
      postedBy->{
        _id,
        name,
        matric,
        level,
        department,
        faculty,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          level,
          department,
          faculty,
          image
        },
      },
      comments[]{
        comment,
        image,
        _key,
        postedBy->{
          _id,
          name,
          level,
          matric,
          department,
          faculty,
          image
        },
      }
    }`;
    return query;
  };
  
  export const postDetailMorePinQuery = (post) => {
    const query = `*[_type == "posts" && category == '${post.category}' && _id != '${post._id}' ]{
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        name,
        level,
        department,
        faculty,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          name,
          level,
          matric,
          department,
          faculty,
          image
        },
      },
    }`;
    return query;
  };
  
  export const searchQuery = (searchTerm) => {
    const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
          image{
            asset->{
              url
            }
          },
              _id,
              destination,
              postedBy->{
                _id,
                userName,
                level,
                department,
                faculty,
                image
              },
              save[]{
                _key,
                postedBy->{
                  _id,
                  userName,
                  level,
                  department,
                  faculty,
                  image
                },
              },
            }`;
    return query;
  };
  
  export const userQuery = (userId) => {
    const query = `*[_type == "users" && _id == '${userId}']`;
    return query;
  };
  
  export const updateUserQuery = (userId) => {
    const query = `*[_type == "users" && _id == '${userId}']`;
    return query;
  };
  
  export const userCreatedPostsQuery = (userId) => {
    const query = `*[ _type == 'posts' && userId == '${userId}'] | order(_createdAt desc){
      image{
        asset->{
          url
        }
      },
      _id,
      title, 
      about,
      category,
      destination,
      postedBy->{
        _id,
        userName,
        level,
        department,
        faculty,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          level,
          department,
          faculty,
          image
        },
      },
    }`;
    return query;
  };
  
  export const userSavedPostsQuery = (userId) => {
    const query = `*[_type == 'posts' && '${userId}' in save[].userId ] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      about,
      postedBy->{
        _id,
        userName,
        level,
        department,
        faculty,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          level,
          department,
          faculty,
          image
        },
        userId,
      },
    }`;
    return query;
  };



  export const sponsoredQuery = `*[_type == 'sponsored'] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    link,
  }`;


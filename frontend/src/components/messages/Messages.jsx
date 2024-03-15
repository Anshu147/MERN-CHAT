import React from 'react'
import Message from './Message'
const Messages = () => {
  return (
    <div className='px-4 flex-1 overflow-auto'> //overflow-auto used to get scroll bar
      <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
    </div>
  )
}

export default Messages



//STARTED CODE SNIPPET
// import Message from './Message'
// const Messages = () => {
//   return (
//     <div className='px-4 flex-1 overflow-auto'> //overflow-auto used to get scroll bar
//       <Message/>
//       <Message/>
//       <Message/>
//       <Message/>
//       <Message/>
//       <Message/>
//       <Message/>
//       <Message/>
//       <Message/>
//       <Message/>
//     </div>
//   )
// }

// export default Messages


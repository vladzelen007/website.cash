const handleServerError = (error) => {
  return error?.data?.message[0]?.messages[0]?.message
}

export default handleServerError; 
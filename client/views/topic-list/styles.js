export const topicPrimaryStyle = (theme) => {
  return {
    root: {
      display: 'flex',
      alignItem: 'center',
    },
    title: {
      color: '#555',
    },
    tab: {
      backgroundColor: theme.palette.primary[500],
      textAlign: 'center',
      display: 'inline-block',
      padding: '0 6px',
      color: '#fff',
      bordrRadius: 3,
      marginRight: 10,
      fontSize: '12px',
    },
    top: {
      backgroundColor: theme.palette.accent[500],
    },
  }
}

export const topicSecondaryStyle = (theme) => {
  return {
    root: {
      display: 'flex',
      alignItem: 'center',
      paddingTop: 3,
    },
    count: {
      textAlign: 'center',
      marginRight: 20,
    },
    username: {
      color: '#9e9e9e',
      marginRight: 20,
    },
    accentColor: {
      color: theme.palette.accent[300],
    },
  }
}

export default topicPrimaryStyle

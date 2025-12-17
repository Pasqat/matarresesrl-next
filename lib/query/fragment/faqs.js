const FaqsFragment = `
fragment Post_FaqsFragment on Post_Faqs {
  fieldGroupName
  faq5 {
    answer
    question
    fieldGroupName
  }
  faq4 {
    answer
    fieldGroupName
    question
  }
  faq3 {
    answer
    fieldGroupName
    question
  }
  faq2 {
    answer
    fieldGroupName
    question
  }
  faq1 {
    answer
    fieldGroupName
    question
  }
}
`

export default FaqsFragment

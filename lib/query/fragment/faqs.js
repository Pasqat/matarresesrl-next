const FaqsFragment = `
fragment FaqsFragment on Post_Faq {
  fieldGroupName
  faq5 {
    answer5
    question5
    fieldGroupName
  }
  faq4 {
    answer4
    fieldGroupName
    question4
  }
  faq3 {
    answer3
    fieldGroupName
    question3
  }
  faq2 {
    answer2
    fieldGroupName
    question2
  }
  faq1 {
    answer1
    fieldGroupName
    question1
  }
}
`

export default FaqsFragment

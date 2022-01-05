export default function PostBody({content}) {
  return (
    <div className="mx-auto max-w-3xl">
      <div
        className="content"
        dangerouslySetInnerHTML={{__html: content}}
      />
    </div>
  )
}

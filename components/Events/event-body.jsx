export default function EventBody({content}) {
  return (
    <div className="mx-auto max-w-4xl text-lg leading-relaxed text-gray-700">
      <div className="content" dangerouslySetInnerHTML={{__html: content}} />
    </div>
  )
}

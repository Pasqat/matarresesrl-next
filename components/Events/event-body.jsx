export default function EventBody({content}) {
  return (
    <div className="max-w-4xl mx-auto text-lg leading-relaxed text-gray-700">
      <div className="content" dangerouslySetInnerHTML={{__html: content}} />
    </div>
  )
}

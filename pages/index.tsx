import * as React from "react"
import fetch from "isomorphic-unfetch"
import { IDataVales } from "../assets/data"

interface IDataResponse {
  ok?: boolean
  data?: IDataVales[]
}

function IndexPage() {
  const [dataResponse, setDataResponse] = React.useState<IDataResponse>({})
  const [checked, setChecked] = React.useState<boolean>(false)

  const onInputClick = React.useCallback(() => {
    setChecked(!checked)
  }, [checked])

  React.useEffect(() => {
    ;(async () => {
      let response = await fetch("/api/data")
      response = await response.json()
      setDataResponse(response)
    })()
  }, [])

  const renderTableContents = (item: IDataVales, index: number) => {
    const {
      Date = "",
      Open = "",
      High = "",
      Low = "",
      Close = "",
      Volume = "",
    } = item

    return !checked ? (
      <tr key={`content-table-item-${index}`} className="table-row">
        <td>{Date}</td>
        <td>{Open}</td>
        <td>{High}</td>
        <td>{Low}</td>
        <td>{Close}</td>
        <td>{Volume}</td>
      </tr>
    ) : (
      <div key={`content-card-item-${index}`} className="ax-card-item">
        <div className="ax-date">Date: {Date}</div>
        <div className="ax-open">Open: {Open}</div>
        <div className="ax-high">High: {High}</div>
        <div className="ax-low">Low: {Low}</div>
        <div className="ax-close">Close: {Close}</div>
        <div className="ax-volume">Volume: {Volume}</div>
      </div>
    )
  }

  return (
    <div className="ax-wrapper">
      <div className="ax-title-block">
        <h1 className="ax-title">Stock Details</h1>
        <label className="switch">
          <input onClick={onInputClick} type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
      {dataResponse.ok === true && (
        <div className="ax-content-block">
          {!checked ? (
            <div className="ax-table-block">
              <table id="ax-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Open</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Close</th>
                    <th>Volume</th>
                  </tr>
                </thead>
                <tbody>{dataResponse.data?.map(renderTableContents)}</tbody>
              </table>
            </div>
          ) : (
            <div className="ax-card-wrapper">
              {dataResponse.data?.map(renderTableContents)}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default IndexPage

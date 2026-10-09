import React from 'react';
import PropTypes from 'prop-types';

const FirmTable = ({
  mappedData,
  columns,
  isWrapped,
  isSmall,
  selectedIds,
  sortConfig,
  csvURL,
  user,
  toggleWrap,
  toggleSelectWithShift,
  sortByKey,
  getSortIcon,
  addFirmBnt,
  handleEditClick,
  handleEditContactClick,
  handleEditMeetClick,
  handleworkshoplistClick,
  handleEditEventClick,
  handleGiftlistClick,
  handlePracticeListClick,
  handledelClick,
}) => {
  return (
    <table className={`firmlist responsive-table ${isWrapped ? 'wrap-cells' : 'nowrap-cells'}`}>
      {mappedData.length !== 0 ? '' : (
        <caption>
          {mappedData.length} záznamů
        </caption>
      )}
      <thead>
        <tr>
          <th>
            <span
              onClick={toggleWrap}
              style={{
                cursor: 'pointer',
                fontSize: '1.2em',
                paddingLeft: '1em',
              }}
              title="Přepnout zalamování textu"
            >
              🔁
            </span>
            &nbsp;Vybrat
          </th>

          {columns.map((column) => (
            <th
              key={column}
              onClick={() => sortByKey(column)}
              className={`col-${column} ${getSortIcon(column) ? 'sorted-colm' : ''}`}
            >
              {column === 'name' ? (
                <>
                  Firma ( {mappedData.length} )
                  {getSortIcon(column)}
                </>
              ) : (
                `${column} ${getSortIcon(column)}`
              )}
            </th>
          ))}
          <th style={{ textAlign: 'left' }}>
            {addFirmBnt()}
            <a href={csvURL} id="csv_export">CSV export</a>
          </th>
        </tr>
      </thead>
      <tbody>
        {mappedData.map((row, rowIndex) => (
          <tr key={row.id} id={`row-${row.name.charAt(0).toLowerCase()}`}>
            <td>
              <input
                type="checkbox"
                checked={selectedIds.has(row.id)}
                onChange={(e) => {
                  toggleSelectWithShift(rowIndex, row.id, e.nativeEvent.shiftKey);
                }}
              />
            </td>

            {columns.map((column) => (
              column === 'name' ? (
                <td
                  key={column}
                  onClick={() => handleEditClick(row.id, row.name)}
                >
                  {(() => {
                    const parts = row[column]?.split(/\/\(kont\)/) ?? [];
                    return (
                      <>
                        <span className={isWrapped ? 'wrap' : ''}>{parts[0]}</span>
                        {parts[1] && <span className="col-contacts">{parts[1]}</span>}
                      </>
                    );
                  })()}
                </td>
              ) : (
                <td
                  key={column}
                  className={`col-${column} ${getSortIcon(column) ? 'sorted-colm' : ''}`}
                >
                  {row[column]}
                </td>
              )
            ))}

            <td>
              <div className={isSmall ? 'small-resolution' : ''}>
                <button type="button" onClick={() => handleEditContactClick(row.id, row.name)}>Kontakty</button>
                <button type="button" onClick={() => handleEditMeetClick(row.id, row.name)} className="blue-btn">Schůzky</button>
                <button type="button" onClick={() => handleworkshoplistClick(row.id, row.name)}>Akce</button>
                <button type="button" onClick={() => handleEditEventClick(row.id, row.name)} className="green-btn">Událost</button>
                <button type="button" onClick={() => handleGiftlistClick(row.id, row.name)} className="orange-btn">Dary</button>
                <button type="button" onClick={() => handlePracticeListClick(row.id, row.name)} className="purple-btn">Praxe</button>
                {user?.user !== 'reader' ? (
                  <button type="button" onClick={() => handledelClick(row.id, row.name)} className="del-btn">Smazat</button>
                ) : (
                  ''
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

FirmTable.propTypes = {
  mappedData: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  isWrapped: PropTypes.bool.isRequired,
  isSmall: PropTypes.bool.isRequired,
  selectedIds: PropTypes.object.isRequired,
  sortConfig: PropTypes.object.isRequired,
  csvURL: PropTypes.string.isRequired,
  user: PropTypes.object,
  toggleWrap: PropTypes.func.isRequired,
  toggleSelectWithShift: PropTypes.func.isRequired,
  sortByKey: PropTypes.func.isRequired,
  getSortIcon: PropTypes.func.isRequired,
  addFirmBnt: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleEditContactClick: PropTypes.func.isRequired,
  handleEditMeetClick: PropTypes.func.isRequired,
  handleworkshoplistClick: PropTypes.func.isRequired,
  handleEditEventClick: PropTypes.func.isRequired,
  handleGiftlistClick: PropTypes.func.isRequired,
  handlePracticeListClick: PropTypes.func.isRequired,
  handledelClick: PropTypes.func.isRequired,
};

export default FirmTable;

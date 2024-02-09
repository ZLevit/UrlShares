import { Link } from "react-router-dom";

export const UrlColumns = [
  {
    field: "title",
    headerName: "URL",
    width: 230,
    renderCell: (params) => (
      <a href={params.row.link} target="_blank" rel="noopener noreferrer">
        <img src={`previewIconUrl/${params.row.title}.png`} alt={params.row.title} />
        {params.row.title}
      </a>
    ),
  },
];

import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { getArchives } from '../../../Services/widgets';
import { getMonthName } from '../../../Utils/utils';

const ArchiveWidget = () => {
    const [archives, setArchives] = useState([]);

    useEffect(() => {
        fetchArchives();

        async function fetchArchives() {
            const data = await getArchives(12);
            if (data) setArchives(data);
            else setArchives([]);
        }
    }, []);

    return (
        <div className="mb-4">
            <h3 className="mb-2 text-success">Bài viết theo tháng</h3>
            {archives.length > 0 && (
                <ListGroup>
                    {archives.map((archive, index) => {
                        return (
                            <ListGroup.Item key={index}>
                                <Link to={`/blog/archive/${archive.year}/${archive.month}`}>
                                    {`${getMonthName(archive.month)} ${archive.year} (${archive.postsCount})`}
                                </Link>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            )}
        </div>
    );
};

export default ArchiveWidget;

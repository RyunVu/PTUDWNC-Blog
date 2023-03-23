using TatBlog.Core.Contracts;
using TatBlog.Core.DTO;

namespace TatBlog.Core.Collections;

public class PaginationResult<T>
{
    private Task<IPagedList<AuthorItem>> authorsList;

    public IEnumerable<T> Items { get; set; }

	public PagingMetadata Metadata { get; set; }
	
	public PaginationResult(IPagedList<T> pagedList)
	{
		Items = pagedList;
		Metadata = new PagingMetadata(pagedList);
	}

}
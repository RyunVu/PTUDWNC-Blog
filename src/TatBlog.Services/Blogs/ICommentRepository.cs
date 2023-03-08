﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TatBlog.Core.Entities;

namespace TatBlog.Services.Blogs {
    public interface ICommentRepository {
        Task<Comment> AddOrUpdateCommentAsync(Comment comment,
            CancellationToken cancellationToken = default);
        Task<bool> DeleteCommentAsync(int id,
            CancellationToken cancellationToken = default);

        Task<Comment> VerifyCommentAsync(int id,
            CommentStatus status,
            CancellationToken cancellationToken = default);
    }
}

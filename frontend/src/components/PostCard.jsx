import React, { useState } from "react";
import NoProfile from "../assets/images/user-profile.svg";
import style from "../styles/page/postCard.module.css";
import { Link } from "react-router-dom";
import moment from "moment";
import * as yup from "yup";
import { postComments } from "../assets/data";

//reply card
const ReplyCard = ({ reply, user, key }) => {
  return (
    <div className={style["reply-card"]}>
      <div className={style["inside"]}>
        <figure>
          <Link to={"/profile/" + reply?.userId?._id}>
            <img
              src={reply?.userId.avatar ?? NoProfile}
              alt={reply?.userId?.firsName}
              className={style["profile-avatar"]}
              width={50}
              height={50}
            />
          </Link>
        </figure>
        <div>
          <p className={style["username"]}>
            {reply?.userId?.firstName ?? "No Name"} {reply?.userId?.lastName}
          </p>
          <p className={style["profession"]}>
            {moment(reply?.created_At).fromNow()}
          </p>
        </div>
      </div>
      <div>{reply?.comment}</div>
    </div>
  );
};

//comment form
const CommentForm = ({ user, id, replyAt, getComments }) => {
  const [formData, setFormData] = useState({
    comment: "",
  });
  const [error, setError] = useState({});

  const validationSchema = yup.object({
    comment: yup.string().required("Write some comment"),
  });

  //handle change
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    try {
      await yup.reach(validationSchema, name).validate(value);
      setError({ ...error, [name]: "" });
    } catch (err) {
      setError({ ...error, [name]: err.message });
    }
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Valid Data: ", formData);
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setError(errors);
    }
  };

  return (
    <>
      <form className={style["comment-form"]} onSubmit={handleSubmit}>
        <input
          className={style["comment-ip"]}
          type="text"
          placeholder="Comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
        />
        <button>Comment</button>
        {error.comment ?? <p className={style["error"]}>{error.comment}</p>}
      </form>
    </>
  );
};

// post
const PostCard = ({ post, user, likePost, deletePost }) => {
  // state
  const [showAll, setShowAll] = useState(0);
  const [showReply, setShowReply] = useState(0);
  const [comments, setComments] = useState([]);
  const [replyComments, setReplyComment] = useState([]);
  const [showComments, setShowComments] = useState(0);

  const getComments = async () => {
    setReplyComment(0);
    setComments(postComments);
  };

  return (
    <div className={style["wrapper"]}>
      <div className={style["user-information"]}>
        <figure>
          <Link to={"/profile/" + post?._id}>
            <img
              src={post?.userId?.avatar ?? NoProfile}
              alt={post?.userId.firsName}
              className={style["profile-avatar"]}
              width={50}
              height={50}
            />
          </Link>
        </figure>
        <div>
          <p className={style["username"]}>
            {post?.userId?.firstName ?? "No Name"} {post?.userId?.lastName}
          </p>
          <p className={style["time"]}>
            {moment(post?.createdAt ?? "no date").fromNow()}
          </p>
        </div>
      </div>
      <div className={style["post-content"]}>
        <h3 className={style["post-title"]}>{post?.title ?? "No Title"}</h3>
        <p>
          {showAll === post?._id
            ? post?.description
            : post?.description.slice(0, 300)}

          {post?.description.length > 301 &&
            (showAll === post?._id ? (
              <span
                className={style["show-less"]}
                onClick={() => setShowAll(0)}
              >
                ...Show Less
              </span>
            ) : (
              <span
                className={style["show-more"]}
                onClick={() => setShowAll(post?._id)}
              >
                ...Show More
              </span>
            ))}
        </p>

        <div>
          {post?.image && (
            <img
              className={style["post-image"]}
              src={post?.image}
              alt="post-image"
              width={450}
              height={300}
            />
          )}
        </div>
      </div>
      <div className={style["btn-actions"]}>
        <button>
          {post?.likes?.includes(user?._id)}
          {post?.likes?.length} Like
        </button>

        <button
          onClick={() => {
            setShowComments(showComments === post._id ? null : post._id);
            getComments(post?._id);
          }}
        >
          {post?.comments?.length} Comment
        </button>

        {user?._id === post?.userId?._id && (
          <button onClick={() => deletePost(post?._id)}>Delete</button>
        )}
      </div>

      {/* comments */}
      {showComments === post?._id && (
        <div className={style["comment-box"]}>
          <CommentForm
            user={user}
            id={post?._id}
            getComments={() => getComments(post?._id)}
          />

          <div className={style["comment-list"]}>
            {comments?.length > 0 ? (
              comments?.map((comment) => (
                <div key={comment?._id} className={style["comment-item"]}>
                  <div className={style["item-infor"]}>
                    <figure>
                      <Link to={"/profile/" + comment?.userId?._id}>
                        <img
                          src={comment?.userId?.avatar ?? NoProfile}
                          alt={comment?.userId?.firsName}
                          className={style["profile-avatar"]}
                          width={50}
                          height={50}
                        />
                      </Link>
                    </figure>
                    <div>
                      <p className={style["username"]}>
                        {comment?.userId?.firstName ?? "No Name"}{" "}
                        {comment?.userId?.lastName}
                      </p>
                      <p className={style["profession"]}>
                        {moment(comment?.createdAt ?? "Bla Bla").fromNow()}
                      </p>
                    </div>
                  </div>

                  <div>{comment?.comment}</div>

                  <span
                    className={style["reply-text"]}
                    onClick={() => setReplyComment(comment?._id)}
                  >
                    Reply
                  </span>

                  {replyComments === comment?._id && (
                    <>
                      <CommentForm
                        user={user}
                        id={post?._id}
                        replyAt={comments?.from}
                        getComments={() => getComments(post?._id)}
                      />

                      {/* replies */}
                      <div className={style["show-reply"]}>
                        {comment?.replies?.length > 0 && (
                          <p
                            onClick={() =>
                              setShowReply(
                                showReply === comment?.replies?._id
                                  ? 0
                                  : comment?.replies?._id
                              )
                            }
                          >
                            Show replies ({comment?.replies?.length})
                          </p>
                        )}

                        {showReply === comment.replies?._id &&
                          comment?.replies?.map((reply) => (
                            <ReplyCard
                              reply={reply}
                              user={user}
                              key={reply?._id}
                            />
                          ))}
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <span>No Comments</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
